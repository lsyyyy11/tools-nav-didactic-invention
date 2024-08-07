async function loadContent() {
    const response = await fetch('content.json');
    const data = await response.json();
    return data;
}

function createToolElement(tool) {
    const toolElement = document.createElement('div');
    toolElement.className = 'tool';
    
    const link = document.createElement('a');
    link.href = tool.link;
    link.target = '_blank'; // 在新标签页中打开链接

    const icon = document.createElement('img');
    icon.src = tool.icon;
    icon.alt = tool.name;

    const name = document.createElement('div');
    name.textContent = `${tool.name}: ${tool.description}`;

    link.appendChild(icon);
    link.appendChild(name);
    toolElement.appendChild(link);

    return toolElement;
}

function createToolsetElement(toolsetName, tools) {
    const toolsetElement = document.createElement('div');
    toolsetElement.className = 'toolset';

    const title = document.createElement('h2');
    title.textContent = toolsetName;

    toolsetElement.appendChild(title);

    tools.forEach(tool => {
        const toolElement = createToolElement(tool);
        toolsetElement.appendChild(toolElement);
    });

    return toolsetElement;
}

async function render() {
    const app = document.getElementById('app');
    const content = await loadContent();

    Object.keys(content).forEach(toolsetName => {
        const toolsetElement = createToolsetElement(toolsetName, content[toolsetName]);
        app.appendChild(toolsetElement);
    });
}

render();
