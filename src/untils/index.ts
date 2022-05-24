export const createChildElementRectMap = (nodes: HTMLElement | null | undefined) => {
    if (!nodes) {
        return new Map();
    }
    let origin = new Map();
    const elements = Array.from(nodes.childNodes) as HTMLElement[];
    elements.forEach((node) => {
        origin.set(node, node.getBoundingClientRect())  
    })
    return origin
}


