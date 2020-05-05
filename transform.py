#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import csv
import json


def find_stop(card, other_cards):
    starts_after = [x['start'] for x in other_cards if x['start'] > card['start']]
    if len(starts_after) > 0:
        return min(starts_after)
    return 0


def parse_int(i):
    if i == '':
        return 0
    return int(i)


def get_seconds(h, m, s):
    return parse_int(h) * 60 * 60 + parse_int(m) * 60 + parse_int(s)


def main(args):
    filename = args.inputcsv
    cards = []
    with open(filename) as csvfile:
        reader = csv.DictReader(csvfile)
        show_max = 0
        for line in reader:
            line['start'] = get_seconds(line['hour'],
                                        line['minute'],
                                        line['second'])
            show_max = max(show_max, int(line['show']))
            cards.append(line)
    cards_by_show = {}
    for i in range(1, show_max+1):
        cards_by_show[i] = [x for x in cards if x['show'] == str(i)]
        for card in cards_by_show[i]:
            card['stop'] = find_stop(card, cards_by_show[i])
    with open('{}.json'.format(filename.split('.')[0]), 'w') as jsonfile:
        json.dump(cards, jsonfile)


if __name__ == "__main__":
    """ This is executed when run from the command line """
    parser = argparse.ArgumentParser()

    # Required positional argument
    parser.add_argument("inputcsv", help="Set info CSV file")

    # Optional verbosity counter (eg. -v, -vv, -vvv, etc.)
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity (-v, -vv, etc)")

    args = parser.parse_args()
    main(args)
