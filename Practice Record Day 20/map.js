function MyMap() {
    let keys = [];
    let values = [];

    return {
        set: function(key, value) {
            let index = keys.indexOf(key);
            if (index === -1) {
                keys.push(key);
                values.push(value);
            } else {
                values[index] = value;
            }
        },
        get: function(key) {
            let index = keys.indexOf(key);
            if (index === -1) {
                return undefined;
            }
            return values[index];
        },
        has: function(key) {
            return keys.indexOf(key) !== -1;
        },
        delete: function(key) {
            let index = keys.indexOf(key);
            if (index !== -1) {
                keys.splice(index, 1);
                values.splice(index, 1);
            }
        },
        show: function() {
            for (let i = 0; i < keys.length; i++) {
                console.log(keys[i], values[i]);
            }
        }
    };
}

let map = MyMap();

map.set("name", "Avichal");
map.set("age", 21);

console.log(map.get("name"));
console.log(map.has("age"));

map.show();

map.delete("age");

map.show();