#!/usr/bin/env bash

set -e

mkdir -p ~/.opt/chris-chan-quotes
cp -r src/ ~/.opt/chris-chan-quotes/
cp -r res/ ~/.opt/chris-chan-quotes/

printf "export cmd to rc [Y/n] "

read b

case $b in
    *y)
        echo "alias chris-chan-quotes=\"node $HOME/.opt/chris-chan-quotes/src/app.js\"" >> ~/.bashrc
    ;;
    *) exit 1
    ;;
esac