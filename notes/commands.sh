
exit

zip -FSrj source source

chromium-browser --pack-extension=source --pack-extension-key=key.pem

rm "source/Cached Theme.pak"
