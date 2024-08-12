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
    accumulatedTags: Set<string>
    constructor(word: Word, parent: WordNode|undefined, child: WordNode|undefined) {
        this.word = word
        this.parent = parent
        this.child = child
        this.routes = []
        this.tags = []
        this.accumulatedTags = new Set()
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

    get tagged() {
        return this.accumulatedTags.size > 0
    }

    get tagSet() {
        return new Set(this.tags)
    }
    
    tag(newTag: string) {
        let par: WordNode | undefined = this;
        while (par) {
            par.accumulatedTags.add(newTag)
            par = par.parent
        }
        return [...this.tags, newTag]
    }

    untag(index: number) {
        let tag = this.tags.splice(index, 1).at(0)
        if (!tag) return this.tags // Doesn't happen
        let par: WordNode | undefined = this
        while (par) {
            if (par.child && par.child.accumulatedTags.has(tag)) return this.tags

            for (let index = 0; index < par.routes.length; index++) {
                const route = par.routes[index];
                if (route.accumulatedTags.has(tag)) return this.tags
            }

            par.accumulatedTags.delete(tag)

            if (!par.tagged) {
                par.removeFromParRoutes()
            }

            par = par.parent
        }
        return this.tags
    }

    removeFromParRoutes() {
        if (this.parent && this.parent.routes.includes(this)) {
            let index = this.parent.routes.indexOf(this)
            this.parent.routes.splice(index, 1)
        }
    }

    setAsChild() {
        if (!this.parent) return
        this.parent.clearChild()
        this.parent.child = this
        this.removeFromParRoutes()
    }

    search(searchSet: Set<string>) {
        let result: WordNode[] = []
        if (this.tagSet.isSupersetOf(searchSet)) {
            result = [this]
        }
        if (this.child) result = [...result, ...this.child.search(searchSet)]
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i]
            result = [...result, ...route.search(searchSet)]
        }
        return result
    }

    currentify() {
        this.clearChild()
        let par: WordNode | undefined = this
        while (par) {
            par.setAsChild()
            par = par.parent
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