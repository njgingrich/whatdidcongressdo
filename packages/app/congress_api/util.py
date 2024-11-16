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
