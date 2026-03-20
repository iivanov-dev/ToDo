function createStorage(key) {
    return {
        key,
        pull: function() {
            const data = localStorage.getItem(this.key);
            if (!data) return null;
            return JSON.parse(data);
        },
        push: function(data) {
            const prepareData = JSON.stringify(data);
            localStorage.setItem(this.key, prepareData);
        }
    };
}

//# sourceMappingURL=ToDo.62cbd901.js.map
