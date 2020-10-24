
const buttonTypes = Object.freeze({
    prev: "prev",
    next: "next"
});

const keyCodes = Object.freeze({
    arrowLeft: "ArrowLeft",
    arrowRight: "ArrowRight"
});

class Button {
    constructor(props) {
        this._button = document.createElement("button");
        this._button.innerText = props.text || "";
    }

    render() {
        return this._button;
    }

    setDisabled(disabled) {
        this._button.disabled = disabled;
    }

    onClick(cb) {
        this._button.addEventListener("click", cb);
    }
}

class Text {
    constructor() {
        this._text = document.createElement("span");
    }

    set text(value) {
        this._text.innerText = value;
    }

    render() {
        return this._text;
    }
}

class List {
    constructor() {
        this._list = document.createElement("ul");
        this._prevButton = new Button({ text: "PREV" });
        this._nextButton = new Button({ text: "NEXT" });
        this._label = new Text();
    }

    addItem(text) {
        const li = document.createElement("li");
        li.innerText = text;

        this._list.appendChild(li);
    }

    setLabel(text) {
        this._label.text = text;
    }

    clear() {
        this._list.innerHTML = "";
    }

    render() {
        const wrapper = document.createElement("div");
        wrapper.className = "list";

        wrapper.appendChild(this._list);
        wrapper.appendChild(this._prevButton.render());
        wrapper.appendChild(this._label.render());
        wrapper.appendChild(this._nextButton.render());

        return wrapper;
    }
}

class AjaxList extends List {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
        this.page = 1;
        this.data = {};

        // this.isPending = false;
    }

    load() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        const searchParams = new URLSearchParams();
        searchParams.set("page", this.page);

        xhr.open("GET", `${this.baseUrl}?${searchParams}`);

        xhr.onload = () => {
            if (xhr.status === 200) {
                this.data = {
                    hasNextPage: xhr.response.info.next !== null,
                    hasPrevPage: xhr.response.info.prev !== null,
                    results: xhr.response.results
                };
                this.onDataLoad();
            } else {
                console.error("Something went wrong");
            }
        };

        xhr.onerror = function () {
            console.error("ERROR");
        }

        xhr.send();
    }

    mapResultItemToText(item) {
        throw new Error("Not implemented!")
    }

    onDataLoad() {
        this.clear();
        this.setLabel(this.page);

        this._prevButton.setDisabled(!this.data.hasPrevPage);
        this._nextButton.setDisabled(!this.data.hasNextPage);

        const listElements = this.data.results.map(item => this.mapResultItemToText(item));
        listElements.forEach(element => this.addItem(element));
    }

    onNextButtonClick() {
        this.page++;
        this.load();
    }

    onPrevButtonClick() {
        this.page--;
        this.load();
    }

    render() {
        this._prevButton.onClick(this.onPrevButtonClick.bind(this));
        this._nextButton.onClick(this.onNextButtonClick.bind(this));

        this.load();
        return super.render();
    }
}

class CharacterList extends AjaxList {
    constructor() {
        super("https://rickandmortyapi.com/api/character/");
    }

    mapResultItemToText(item) {
        return `Status: ${item.status}, name: ${item.name}`
    }
}

class EpisodesList extends AjaxList {
    constructor() {
        super("https://rickandmortyapi.com/api/episode/");
    }

    mapResultItemToText(item) {
        return `name: ${item.name}`;
    }
}

const characterList = new CharacterList();
document.body.appendChild(characterList.render());

const episodesList = new EpisodesList();
document.body.appendChild(episodesList.render());
