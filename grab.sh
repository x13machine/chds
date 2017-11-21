#!/bin/bash
coins=$(curl -s 'https://api.coinmarketcap.com/v1/ticker/?limit=0')

for row in $(echo "${coins}" | jq -r '.[] | @base64'); do  
	_jq() {
		echo ${row} | base64 --decode | jq -r ${1}
    }
	id="$(_jq '.id')"
	echo "$id"
	node his.js "$id"
done  
