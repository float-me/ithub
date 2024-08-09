import { getHeading } from './heading';

type CharMap = {
    successors: Set<string>
    predecessors: Set<string>
    outWords: string[]
}

export class WordGraph {
    charMap: Map<string, CharMap>
    constructor(wordList: string[]) {
        let properWordList = wordList.filter((x) => (x.length > 1))

        this.charMap = new Map();
    
        for (let word of properWordList) {
          let head = word[0];
          let last = word[word.length - 1];
          this._setKeys(head);
          this._setKeys(last);
        }
    
        // graph
        for (let word of properWordList) {
          let head = word[0];
        
    
          let last = word[word.length - 1];
      
        
          // heading 처리
          for (let headChan of getHeading(head)) {
            if (this.charMap.has(headChan)) {
                this.charMap.get(headChan)?.outWords.push(word)
                this.charMap.get(headChan)?.successors.add(last);
            }
            if (this.charMap.has(last)) {
                this.charMap.get(last)?.predecessors.add(headChan);
            }
          }
        }
      }

    _setKeys(char: string) {
      if (!this.charMap.has(char)) {
        let charMap = {
            successors: new Set<string>(),
            predecessors: new Set<string>(),
            outWords: []
        }
        this.charMap.set(char, charMap)
      }
    }

    has(word: string) {
        let outWords = this.charMap.get(word[0])?.outWords;
        if (outWords) {
            return outWords.includes(word);
        } else {
            return false;
        }
    }
}