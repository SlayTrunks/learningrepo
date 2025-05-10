#!/bin/bash

myArray=(1 2 Hello "hello bruder")
echo "$myArray" #returns first value ie 1

echo "${myArray[3]}"
echo "${myArray[*]}" # returns all values
echo "${#myArray[*]}" # returns length of array

myArray+=(2 3 "hi again") #adds these values
echo "${myArray[*]}"
echo "${myArray[*]:4:2}" #this returns 2 values from fourth index
echo "${myArray[*]:4}"   #this returns  all values from fourth index

unset myArray[4]

echo "${myArray[*]}"

#objects is also called array

declare -A myArray2

myArray2=([name]=insane [age]=22)
echo "The name is ${myArray2[name]} and age is ${myArray2[age]}"
