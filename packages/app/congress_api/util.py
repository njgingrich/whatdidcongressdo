from datetime import datetime
import pytz

def get_nested(data, keys, default=None):
  """
  Recursively retrieves a nested value from a dictionary.

  Args:
    data: The dictionary to search.
    keys: A list of keys to follow. Should be dot-separated keys.
    default: The value to return if the key is not found.

  Returns:
    The nested value or the default value.
  """

  for key in keys.split("."):
    if isinstance(data, dict):
      data = data.get(key, default)
    else:
      return default
  return data

def localize_datetime(date_str: str, format="%Y-%m-%dT%H:%M:%SZ", timezone='America/New_York') -> datetime:
  """
  Parses a date string into a datetime object. By default, parses into NY timezone to match DC time.

  Args:
    date_str: The date string to parse.
    fmt: The format string to use for parsing.

  Returns:
    A datetime object.
  """
  tz = pytz.timezone(timezone)

  return tz.localize(datetime.strptime(date_str, format))
