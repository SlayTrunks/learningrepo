#!/bin/bash

a="hello world"

length=${#a}
echo "length of variable is ${length}"

uppercase=${a^^}

echo "uppercase variable is ${uppercase}"


lowercase=${a,,}

echo "lowercase variable is ${lowercase}"

replace=${a/world/mate}

echo "changed variable is ${replace}"

slice=${a:5:10}

echo "sliced variable is ${slice}" #from 5th to 10th slices

slice1=${a:5}

echo "sliced variable is ${slice1}" #everything from fifth slice
