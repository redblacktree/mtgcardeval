import argparse
import copy
import json
import time

import requests

"""
{
    "name": "Everquill Phoenix",
    "hour": "",
    "show": "2",
    "color": "R",
    "stop": 2191,
    "start": 2072,
    "grade": "A-",
    "second": "32",
    "link": "https://www.youtube.com/watch?v=PlEC0it1WKo&t=00h34m32s",
    "time_code": "00h34m32s",
    "collector_num": "114",
    "minute": "34"
  },
  {
    "name": "Evolving Wilds",
    "color": "",
    "grade": "C+",
    "clips": [
      {
        "videoId": "w0nzu-99Bs8",
        "playOrder": 0,
        "stop": 0,
        "start": 13971
      }
    ],
    "collector_num": "247"
  },
"""


def main(args):
    with open(args.inputjson) as inputfile:
        data = json.load(inputfile)
        new_data = copy.deepcopy(data)
        new_data['cards'] = []
        for card in data['cards']:
            time.sleep(0.11)
            response = json.loads(requests.get('https://api.scryfall.com/cards/{set_code}/{collector_num}'.format(set_code=card['set_code'], collector_num=card['collector_num'])).content)
            card["image_url"] = response['image_uris']['png']
            print card["image_url"]
            new_data['cards'].append(card)
    with open(args.inputjson.split('.')[0] + '.output.json', 'w') as outputfile:
        json.dump(new_data, outputfile)


if __name__ == "__main__":
    """ This is executed when run from the command line """
    parser = argparse.ArgumentParser()

    # Required positional argument
    parser.add_argument("inputjson", help="Set info JSON file in old format")

    # Optional verbosity counter (eg. -v, -vv, -vvv, etc.)
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity (-v, -vv, etc)")

    args = parser.parse_args()
    main(args)