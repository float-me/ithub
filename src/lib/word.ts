import { getHeading } from './heading';

export class Word {
    head: string;
    heading: string[]
    tail: string;
    headingIndex: number;
    constructor(head: string, tail: string, headingIndex: number) {
        this.head = head;
        this.heading = getHeading(head);
        this.tail = tail;
        this.headingIndex = headingIndex;
    }

    get curHead() {
        return this.heading[this.headingIndex]
    }

    get last() {
        return this.tail[this.tail.length - 1]
    }

    get length() {
        return 1 + this.tail.length
    }

    get word() {
        return this.curHead.concat(this.tail)
    }
}

export class WordNode {
    word: Word
    parent: WordNode|undefined
    child: WordNode|undefined
    routes: WordNode[]
    tags: string[]
    tagged: boolean
    constructor(word: Word, parent: WordNode|undefined, child: WordNode|undefined) {
        this.word = word
        this.parent = parent
        this.child = child
        this.routes = []
        this.tags = []
        this.tagged = false
    }

    isRoot() {
        return (this.word === undefined)
    }

    createChild(newWord: Word) {
        this.word = newWord
        let child = new Word(newWord.last, '', 0);

        for (let index = 0; index < this.routes.length; index++) {
            const route = this.routes[index];
            if (route.word.head === newWord.last) {
                this.child = route
                this.routes.splice(index, 1)
                if (route.child) {
                    route.routes.push(route.child)
                    route.child = undefined
                }
                route.word = child
                return route
            }
        }
        
        return this.setNovelChild(child)
    }

    setNovelChild(child: Word) {
        let childNode = new WordNode(child, this, undefined)
        this.child = childNode
        return childNode
    }

    clearChild() {
        if (this.child && this.child.tagged) {
            this.routes.push(this.child)
        }
        this.child = undefined
        this.word = new Word(this.word.head, '', this.word.headingIndex)
    }
    
    tag(newTag: string) {
        let par: WordNode | undefined = this;
        while (par) {
            par.tagged = true
            par = par.parent
        }
        return [...this.tags, newTag]
    }

    untag(index: number) {
        this.tags.splice(index, 1)
        let par: WordNode | undefined = this
        while (par) {
            if (par.tags.length > 0) break
            if (this.child && this.child.tagged) break
            this.routes.forEach(route => {
                if (route.tagged) return this.tags
            });
            par.tagged = false
            if (par.parent && par.parent.routes.includes(par)) {
                let index = par.parent.routes.indexOf(par)
                par.parent.routes.splice(index, 1)
            }
            par = par.parent
        }
        return this.tags
    }

    get before() : Word[]{
        if (this.parent) {
            return [...this.parent.before, this.parent.word]
        } else {
            return []
        }
    }

    get after() : Word[]{
        if (this.child) {
            return [this.child.word, ...this.child.after]
        } else {
            return []
        }
    }

    get root() : WordNode{
        if (this.parent) {
            return this.parent.root
        } else {
            return this
        }
    }

    get leaf() : WordNode{
        if (this.child) {
            return this.child.leaf
        } else {
            return this
        }
    }
}