import argparse
import json

"""
[
  "Almighty Brushwag": {
    "start": "747.5",
    "stop": "756",
    "name": "Almight Brushwag",
    "videoId": "0iX97ekXjHU"
  },
  [...]
]

{
  "cards": [
    {
      "name": "Adaptive Shimmerer",
      "color": "",
      "clips": [
        {
          "start": 2922,
          "stop": 2974,
          "videoId": "w0nzu-99Bs8"
        }
      ],
      "grade": "C-",
      "image_url": "https://img.scryfall.com/cards/png/front/d/8/d8a2e243-e446-46c6-8a37-e26620951c41.png?1586545316",
      "set_code": "iko",
      "collector_num": "1"
    },
    [...]
  ]
}
"""


def get_card(current_data, card_name):
    cards = [x for x in current_data["cards"] if x['name'] == card_name]
    if len(cards) == 1:
        return cards[0]
    if len(cards) > 1:
        print('WARNING: Found more than one entry for {}'.format(card_name))
        return cards[0]
    else:
        print('WARNING: Found no entry for {}'.format(card_name))
        return None


def main(args):
    with open(args.currentdata) as currentdata_file:
        current_data = json.load(currentdata_file)
    with open(args.newdata) as newdata_file:
        new_cards = json.load(newdata_file)
        for card_name, card in new_cards.items():
            if "name" in card:
                current_card = get_card(current_data, card['name'])
                if current_card is None:
                    print(json.dumps(card, indent=2))
                    continue
                if 'clips' not in current_card:
                    current_card['clips'] = []
                current_card['clips'].append({
                    "start": card['start'],
                    "stop": card['stop'],
                    "videoId": card['videoId']
                })
                current_card['grade'] = card['grade'] if card['grade'] != "" else current_card['grade']
    with open(args.currentdata.split('.')[0] + '.output.json', 'w') as outputfile:
        json.dump(current_data, outputfile)


if __name__ == "__main__":
    """ This is executed when run from the command line """
    parser = argparse.ArgumentParser()

    # Required positional argument
    parser.add_argument("currentdata", help="Current set info JSON file")
    parser.add_argument("newdata", help="New card info file from the browser extension")

    # Optional verbosity counter (eg. -v, -vv, -vvv, etc.)
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity (-v, -vv, etc)")

    args = parser.parse_args()
    main(args)