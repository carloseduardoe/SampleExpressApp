class TempDatabase {
    constructor() {
        this.users = [];
        this.tokens = {};

        setInterval(() => {
            Object.keys(this.tokens).forEach(item => {
                if (this.tokens[item].count)
                    item.count--;
                else
                    delete this.tokens[item];
            });
        }, 1000);
    }
}

module.exports = TempDatabase;