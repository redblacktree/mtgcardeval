import argparse
import copy
import json
import time
from math import ceil

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

BASIC_LANDS = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest']


def transform_data(scryfall_card, preferred_face=0):
    try:
        if "image_uris" in scryfall_card:
            image_url = scryfall_card["image_uris"]["png"],
        elif "card_faces" in scryfall_card:
            image_url = scryfall_card["card_faces"][preferred_face]["image_uris"]["png"]
        card = {
            "name": scryfall_card["name"],
            "color": ''.join(scryfall_card["color_identity"]),
            "image_url": image_url,
            "set_code": scryfall_card["set"],
            "collector_num": scryfall_card["collector_number"]
        }
        return card
    except KeyError: # If the script has trouble finding something, print what we did find for debugging
        print(scryfall_card)
        raise


def get_scryfall_data(set, end_collector_num, chunk_size=75):
    scryfall_card_data = []
    identifiers = []
    for collector_num in range(1, end_collector_num + 1):
        identifiers.append({"set": set, "collector_number": str(collector_num)})
    requests_needed = int(ceil(float(len(identifiers)) / float(chunk_size)))
    for x in range(1, requests_needed + 1):
        start_index = (x - 1) * chunk_size
        end_index = (x * chunk_size) - 1
        end_index = end_index if end_index < end_collector_num else end_collector_num - 1
        ids_in_chunk = identifiers[start_index:end_index+1]
        resp = requests.post('https://api.scryfall.com/cards/collection', json={"identifiers": ids_in_chunk})
        resp = json.loads(resp.content)
        if len(resp['not_found']) > 0:
            print('WARNING: some IDs not found: ')
            print(resp['not_found'])
        scryfall_card_data.extend(resp['data'])
        time.sleep(1.1)
    return [x for x in scryfall_card_data if x['name'] not in BASIC_LANDS]


def main(args):
    scryfall_data = get_scryfall_data(args.setcode, int(args.cardsinset))
    data = {'cards': [transform_data(x, args.preferred_face) for x in scryfall_data]}
    if args.outfile:
        with open(args.outfile, "w") as outfile:
            json.dump(data, outfile, indent=2)
    else:
        print(json.dumps(data, indent=2))


if __name__ == "__main__":
    """ This is executed when run from the command line """
    parser = argparse.ArgumentParser()

    # Required positional argument
    parser.add_argument("setcode", help="Set code to collect data for (e.g. m21 iko, etc)")
    parser.add_argument("cardsinset", help="Number of cards in set, excluding promo cards, etc")
    parser.add_argument("-o", "--outfile", action="store", dest="outfile", default=None,
                        help="Name of file to output results to")
    parser.add_argument("-f", "--face", action="store", dest="preferred_face", default=0,
                        help="For double-faced cards, the preferred face for display")

    # Optional verbosity counter (eg. -v, -vv, -vvv, etc.)
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity (-v, -vv, etc)")

    args = parser.parse_args()
    main(args)
