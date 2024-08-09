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

    setChild(child: Word|undefined) {
        if (this.child && this.child.tagged) {
            this.routes.push(this.child)
        }
        if (child) {
            let childNode = new WordNode(child, this, undefined)
            this.child = childNode
            return childNode
        } else {
            this.child = undefined
            return this
        }
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