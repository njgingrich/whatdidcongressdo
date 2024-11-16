# https://github.com/LibraryOfCongress/api.congress.gov/blob/a828507b12c57cb0c2763af71307792fbdf2b8d9/api_client/python/cdg_client.py

from urllib.parse import urljoin

import requests

API_VERSION = "v3"
ROOT_URL = "https://api.congress.gov/"
RESPONSE_FORMAT = "json"

class _MethodWrapper:
    """ Wrap request method to facilitate queries.  Supports requests signature. """

    def __init__(self, parent, http_method):
        self._parent = parent
        self._method = getattr(parent._session, http_method)

    def __call__(self, endpoint, *args, **kwargs):  # full signature passed here
        url = urljoin(self._parent.base_url, endpoint).lower()
        print(f"{url, kwargs}")
        response = self._method(url, *args, **kwargs)
        # unpack
        if response.headers.get("content-type", "").startswith("application/json"):
            return response.json(), response.status_code
        else:
            return response.content, response.status_code

class ApiClient:
    def __init__(
        self,
        api_key,
        api_version=API_VERSION,
        response_format=RESPONSE_FORMAT,
        raise_on_error=True,
    ):
        self.base_url = urljoin(ROOT_URL, api_version) + "/"
        self._session = requests.Session()

        # do not use url parameters, even if offered, use headers
        self._session.params = {"format": response_format}
        self._session.headers.update({"X-Api-Key": api_key})

        if raise_on_error:
            self._session.hooks = {
                "response": lambda r, *args, **kwargs: r.raise_for_status()
            }

    def __getattr__(self, method_name):
        """Find the session method dynamically and cache for later."""
        method = _MethodWrapper(self, method_name)
        self.__dict__[method_name] = method
        return method

def paginate_until(condition, offset=0, limit=20, max_offset=100):
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            while True and offset <= max_offset:
                kwargs['offset'] = offset
                kwargs['limit'] = limit
                response = func(*args, **kwargs)

                if not response.ok:
                    raise Exception(f"API request failed with status code {response.status_code}")

                data = response.json()
                results.extend(data['results'])

                if not condition(data, offset, limit):
                    break

                offset += limit

            return results

        return wrapper
    return decorator
