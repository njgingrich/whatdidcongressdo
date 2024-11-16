import multiprocessing
import requests

def call_request(req):
    req()

def request_pool(requests, pool_size):
    with multiprocessing.Pool(pool_size) as pool:
        results = pool.map(call_request, requests)
    return results
