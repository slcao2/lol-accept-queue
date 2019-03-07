# lol-accept-queue
Accept the queue in LOL with the space or enter key

Currently still a WIP but it should work unless something changes with Riot's API.  
**Todo:**  
Run it automatically on startup  
One click installation  

**Getting it to run**  
1. Install NodeJS https://nodejs.org/en/ (The LTS build one should work fine)  
2. Either install git and pull down this repo or just copy paste the index.js and package.json file into a folder  
3. Modify the package.json file and change this line `"start": "node index.js \"E:\\Riot Games\\League of Legends\\\\\"",` after the index.js to the location of your League installation. You'll need to escape the characters to put the slashes in.  
4. Open the command prompt (click windows key and type cmd)  
5. Navigate to the folder where you copied these files (cd <wherever your folder is>)  
6. Run `npm install`  
7. Run `npm run start`  

That should open a window in the background. As long as you leave it open, it should work. Any time you click space or enter, it should accept queue.  
