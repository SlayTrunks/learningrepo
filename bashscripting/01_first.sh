#!/bin/bash 


# this is single line comment
<<comment 
this is
multi line
comments
comment

#variables

a="hey yo";
b=20;

echo "$a"; 

a="not hey";

echo "$a";

#variable to store output of bash commands eg ls, hostname , ls -R ... etc and many  more

list=$(ls)
echo "$list" #use command bash filename to get list of any folder you are in

#constant variable

readonly p="insaen"
echo "$p"
p="not" //throws error
