## netflix-clone
this is a simple netflix clone made with react.
you can see it [here](https://netflix-clone-mocha-two.vercel.app/)

![screenshot](https://github.com/Nadzt/netflix-clone/blob/main/images/screenshot-1.png)

### how to clone this repository:
first, you'll need a tmdb key, you can get one [here](https://developer.themoviedb.org/reference/intro/authentication)
the one you need is called "Access Token Auth"

cd into the folder you want to copy this repo
clone it:

    git clone https://github.com/Nadzt/netflix-clone.git
cd into the project folder

    cd netflix-clone
now, with your code editor create a file named ".env"
on the parent folder(netflix-clone/)
and write this:

    VITE_TMDB_BEARER="YOUR ACCESS TOKEN AUTH KEY HERE!"
install dependencies

    npm i
start the server

    npm run dev
done, go to the link displayed on your terminal!
