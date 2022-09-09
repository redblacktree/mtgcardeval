import argparse
import json


def reformat_grade(card):
    grade = {"LR": card["grade"]} if "grade" in card else {}
    card["grade"] = grade
    return card


def main(args):
    with open(args.datafile) as datafile:
        data = json.load(datafile)
    with open(args.datafile.split('.')[0] + '.output.json', 'w') as outputfile:
        data['cards'] = [reformat_grade(x) for x in data['cards']]
        json.dump(data, outputfile)


if __name__ == "__main__":
    """ This is executed when run from the command line """
    parser = argparse.ArgumentParser()

    # Required positional argument
    parser.add_argument("datafile", help="Data file to reformat grades")

    # Optional verbosity counter (eg. -v, -vv, -vvv, etc.)
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity (-v, -vv, etc)")

    args = parser.parse_args()
    main(args)
