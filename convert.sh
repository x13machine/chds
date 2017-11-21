#!/bin/bash
for f in ./json/*
do
	base="$(basename $f)"
	name="${base::-5}"
	echo "$name"
	python json_to_csv.py "$f" "csv/$name.csv"
done
