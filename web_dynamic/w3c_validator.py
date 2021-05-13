#!/usr/bin/python3
"""
W3C validator for Holberton School

For HTML and CSS files.

Based on 2 APIs:

- https://validator.w3.org/nu/
- http://jigsaw.w3.org/css-validator/validator


Usage:

Simple file:

```
./w3c_validator.py index.html
```

Multiple files:

```
./w3c_validator.py index.html header.html styles/common.css
```

All errors are printed in `STDERR`

Return:
Exit status is the # of errors, 0 on Success

References

https://developer.mozilla.org/en-US/

"""
import sys
import requests


def __print_stdout(msg):
    """Print message in STDOUT
    """
    sys.stdout.write(msg)


def __print_stderr(msg):
    """Print message in STDERR
    """
    sys.stderr.write(msg)


def __analyse_html(file_path):
    """Start analyse of HTML file
    """
    h = {'Content-Type': "text/html; charset=utf-8"}
    d = open(file_path, "rb").read()
    u = "https://validator.w3.org/nu/?out=json"
    r = requests.post(u, headers=h, data=d)
    res = []
    messages = r.json().get('messages', [])
    for m in messages:
        res.append("[{}:{}] {}".format(file_path, m['lastLine'], m['message']))
    return res