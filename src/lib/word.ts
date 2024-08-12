import { getHeading } from './heading';

export class Head {
    origin: string;
    candidates: string[]
    index: number;
    constructor(origin: string, index: number) {
        this.origin = origin;
        this.candidates = getHeading(origin);
        this.index = index;
    }

    get value() {
        return this.candidates[this.index]
    }

    rotate() {
        if (this.candidates.length === 1) return
        this.index += 1
        if (this.index === this.candidates.length) {
            this.index = 0
        }
    }
}

export class WordNode {
    head: Head

    parent: WordNode|undefined
    parentTail: string

    child: WordNode|undefined
    routes: WordNode[]

    tags: string[]
    accumulatedTags: Set<string>
    constructor(head: Head, child: WordNode|undefined) {
        this.head = head

        this.parent = undefined
        this.parentTail = ''

        this.child = child
        this.routes = []

        this.tags = []
        this.accumulatedTags = new Set()
    }

    setParent(parent: WordNode, tail: string) {
        this.parent = parent
        this.parentTail = tail
        return this
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

    get tagged() {
        return this.accumulatedTags.size > 0
    }

    clearChild() {
        if (this.child && this.child.tagged) {
            this.routes.push(this.child)
        }
        this.child = undefined
    }

    tag(tag: string) {
        let par: WordNode | undefined = this;
        while (par) {
            par.accumulatedTags.add(tag)
            par = par.parent
        }
        this.tags.push(tag)
        return this.tags
    }

    createChild(tail: string) {
        for (let index = 0; index < this.routes.length; index++) {
            const route = this.routes[index];
            if (route.head.value === tail[tail.length - 1]) {
                this.child = route
                this.routes.splice(index, 1)
                if (route.child) {
                    route.routes.push(route.child)
                    route.child = undefined
                }
                return route
            }
        }
        
        let childHead = new Head(tail[tail.length - 1], 0)
        this.child = new WordNode(childHead, undefined).setParent(this, tail)
        return this.child
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

    search(searchSet: Set<string>) {
        let result: WordNode[] = []
        if (searchSet.isSubsetOf(new Set(this.tags))) {
            result = [this]
        }
        if (this.child && this.child.tagged) result = [...result, ...this.child.search(searchSet)]
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i]
            result = [...result, ...route.search(searchSet)]
        }
        return result
    }

    get before() : string[] {
        if (!this.parent) return []
        return [...this.parent.before, this.parent.head.value + this.parentTail]
    }

    get after() : string[] {
        if (!this.child) return []
        if (this.child.child) {
            return [this.child.head.value + this.child.child.parentTail, ...this.child.after]
        }
        return [this.child.head.value]
    }
}