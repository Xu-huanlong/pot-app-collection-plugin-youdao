async function collection(source, _target, options = {}) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    const { cookie } = config;

    if (cookie === undefined || cookie.length === 0) {
        throw "cookie not found";
    }

    let res = await fetch("https://dict.youdao.com/wordbook/webapi/v2/ajax/add", {
        method: "POST",
        headers: { "Cookie": cookie },
        query: {
            word: source,
            lan: "en"
        }
    });

    if (res.ok) {
        const result = res.data;
        if (result.code === 0) {
            return true;
        } else if (result.msg) {
            throw result.msg;
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}