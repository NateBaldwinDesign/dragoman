../json2clr -n test -i test.json -o test.clr
../clr2json -n test -i test.clr -o result.json

more test.json
more result.json

../json2clr -n test -i result.json -o result.clr
../clr2json -n test -i result.clr -o result2.json

more result2.json

echo '===================================='

ret=`diff result.json result2.json`

if [ -z "$ret" ]; then
  echo "SUCCESS!"
else
  echo "$ret"
  echo "FAILED...!"
fi
