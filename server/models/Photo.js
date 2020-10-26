const fs = require('fs');
const path = require('path');

class Photo {
    constructor(author, url, description, text) {
        this.author = author;
        this.url = url;
        this.description = description;
        this.text = text;
    }

    toJSON() {
        return {
            author: this.author,
            url: this.url,
            description: this.description,
            text: this.text 
        };
    }

    async save(category, pathology) {
        const atlas = await Photo.getData();

        const index = atlas[category].pathology.findIndex(p => p.id === pathology);

        atlas[category].pathology[index].images.unshift(this);

        return new Promise((resolve, reject)=> {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'atlas.json'),
                JSON.stringify(atlas),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getData() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../data', 'atlas.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        });        
    }
} 

module.exports = Photo;