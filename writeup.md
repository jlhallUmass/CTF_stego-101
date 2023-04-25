# Stego 101 Solution

This CTF challenge is fairly simple. There are three different messages stored inside an image or a .sav file on each of the challenge webpages. They are hidden in varying degrees of complexity, but I wouldn't consider them extremely difficult to find.

Once all 3 hidden messages/flags are found, we wrap them in CTF_SDaT{} to get the solution.

## The Hidden Messages:

### 1. string.html

This webpage has nothing but an image, `string.jpg`,  and some text below it. Naturally, you can run `strings string.jpg` to find a hidden message within the image binary:

```
$ strings string.jpg 
JFIF
<snip>
1A"Qaq
(CS561)The first flag is "FL1_y4rN"
```
So the first Flag is `FL1_y4rN`

### 2. bell.html

This webpage has an image of a bell, `bell.jpg` and a button to ring it. This time, the flag is hidden within the 
.wav file that plays when you click the button.

The first step is finding the sound file. Analyzing the code will show that the webpage's button calls a ringBell() function from the bell.js javascript file. If you look at that file, you will see it creates its Audio object from `/sounds/bell.wav`. If you navigate to `https://localhost:<port>/sounds/bell.wav`, you will be able to find a direct link and download to the wav file. (Alternatively, you can look at the network monitor in chrome to find a link to `bell.wav`.

The flag was hidden in this file using `steghide` with no password (NOTE: there is a hint here. If you observe the metadata for the audio file, you will find a reference to steghide). If you run `steghide extract -sf bell.wav`, you will find the next flag:
```
$ steghide extract -sf bell.wav -xf -
Enter passphrase: 
The second flag is "FL2_stego"
```
flag #2 is `FL2_stego` 
### 3. golf.html

Here There is a simple slideshow with 5 images/captions. 4 of the images are complete red herrings, but the image of the golf flag (naturally) contains the third and final flag.

This one is arguably the simplest/easiest: the flag is hidden in plaintext within the Exif metadata for `golf-flag.jpg`. You can use any tool to view the exif data for the image. In my case, i used `exiftool`. You can parse through the metadata manually, or use grep to find any data related to 'flag' to optimize your search:
```
$ exiftool golf-flag.jpg | grep flag
File Name                       : golf-flag.jpg
Make                            : (CS561)The third CTF flag is: "H0l3_in_0Ne"
```
so flag #3 is `H0l3_in_0ne`

## Putting it all Together

We have our 3 flags now:

 1. `FL1_y4rN`
 2. `FL2_stego` 
 3. `H0l3_in_0ne`

Following the proper format we can create our final flag:
`CTF_SDaT{FL1_y4rNFL2_stegoH0l3_in_0ne}`
