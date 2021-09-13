var fetch = require('node-fetch');

let x =fetch('https://www.amtrak.com/services/MapDataService/AutoCompleterArcgis/getResponseList?searchTerm=ATL', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Referer': 'https://www.amtrak.com/home.html',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Cookie': '_abck=14819844390BC453EDF1FB1ABC08EC61~0~YAAQVCs0F5ZWkaZ7AQAAi9sf0QagZ0gpzPLSM6CAsj/GF5ANXHjds9kqcSqPpfy2m0bg0INvjf/Via0L1tSkHoLbVSTjRv3gX9JQXRxNliyCOhmk5Wf6THvYJBNDecnNtj/rWdbTo7Cu/IprjLJVlNtlSqTHAILlLg3zy2hlGwuPrMr5LSelEnWlLVdObVb2lC6fksDLmopOiIQCO+y6jirFoR2mW9nqYB+A7jpUMWpuZWU5i4f/LyGrdOjQgSTvK3asrDs0Ulw+odcEO7EIaNUrEGBVto143vTNE9MiFA3icjkmmmLLuK4stj9OdIlbl8+7RKPlhlfrt2PPtCZ1GYmzo18pUixKlo0ZUBhW6YlKIjI4I5qXqJVjB8ARGAjyymCclxmkxMbqmXc+ol+WLbjES3S+sHX5~-1~-1~-1; AMCV_2909B74F57B49A137F000101%40AdobeOrg=-715282455%7CMCIDTS%7C18881%7CMCMID%7C76993022536013989323857308514182655669%7CMCAAMLH-1629859124%7C7%7CMCAAMB-1631301126%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1631308330s%7CNONE%7CMCSYNCSOP%7C411-18862%7CvVersion%7C4.2.0%7CMCAID%7CNONE; mbox=PC#eeb6a6dd74f349b89173d43d336fd390.34_0#1692314966|session#19ff29cb7c7a4ed5b33510da5938961d#1631302988; __utma=56932666.446847491.1619315047.1629119879.1629254323.33; __utmz=56932666.1625783720.29.11.utmcsr=google|utmdsid=CjwKCAjwg4-EBhBwEiwAzYAlsps20qv7UTLVqEFRqpWuGSt9xlgk1cCr4xp1wV7uycqP_vhGlGj8XxoCxNQQAvD_BwE|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _gcl_au=1.1.1128464898.1619315047; _hjid=82f2c6f3-75e8-4653-8f6c-68e30480a926; _fbp=fb.1.1619315047444.1974333966; _pin_unauth=dWlkPU1UUXhNREpqTXpNdFkyRmhZaTAwWWpGa0xXSXpNREF0Wm1WaFptTXpaR00xTURsaQ; kampyle_userid=9647-9de0-e18c-0202-6c6e-2bfe-1759-d860; kampyleUserSession=1631301132183; kampyleSessionPageCounter=1; kampyleUserSessionsCount=71; cd_user_id=17906b2c1a766e-0b937a0655e5988-7e22675c-1fa400-17906b2c1a83bc; _rdt_uuid=1624240844609.a1046f53-a796-4d22-be57-c3bb721b356b; _ga=GA1.2.446847491.1619315047; user-opeted-email=true; s_fid=42E45120D0378F36-34FBD4D9244614BC; _derived_epik=dj0yJnU9dGJ3dXhiWGRGLVlVb0tYcVJaeFZIUnRpb21HYk5kMjgmbj1UYXNCT3hNSXRlRy1LVmhIbW85X1VnJm09MSZ0PUFBQUFBR0RuZmJvJnJtPTEmcnQ9QUFBQUFHRG5mYm8; va_au=1.1.1877664615.1624499952; mc_au=1.1.1655390192.1624499952; pa_au=1.1.1382014765.1624499952; mdLogger=false; s_getNewRepeat=1629254669600-Repeat; amtrak_gdpr_accept=true; _uetvid=7e695100d23411eb90eb6dc4dd4fa3c3; check=true; AMCVS_2909B74F57B49A137F000101%40AdobeOrg=1; bm_sz=50272FFEC5D894B26263A0F3246162CD~YAAQVCs0F2JUkaZ7AQAAjs4f0Q1BThzzOQJPd3EZokf8f2CA3h989Sdq6as7tqGmsW+hIun3nThbUeSXeJVFO4TTJsrbAofHX6NDeKtoDZEhIubkYM1+C7QHmd0M6lRstY7VgOC5etbeUVrwnZ8ZGG8I8TB9aDUwr6/1XZtux1U4CnlmqEacMkSkP+/VnCqbv0IFUhzXRdXaMqyOXkIHBBFVv8BLoYWvlMcKLcwiNzjueB842gWgaQXE9ydVtxoiP6yEcxE/6hqg5ulDSWVG3pFLRTx2WrhMZK/k4WF5MvCn2V8=~3162678~4274224; ak_bmsc=B4F584450BBA98BE442DC669CF01D806~000000000000000000000000000000~YAAQVCs0F25UkaZ7AQAA1c4f0Q2JQKVFz/kZ6BC6ie36iYbHlFygUe3hGb3SJaxxrSHDrqzDPT4zvlD2LxJ5je1ADP43ZPcLLGcxW10apDe3qaxr4oJq0qnEfFetW0v/jPtA/NCoQ6h/L9yfhuTr8lMAOHhB6LY2KiBxtuZq93vGrXHQRX/gd1aMP6h7vXmvGk+M5j7AwXWdNHDMtQc+teBqOWQd8vNkK0xE7Rs8lTPm6a7dlZaDq3lMMh0JKLw/0slXhafCBIp7BNXVMWgemmtZPZLweuJU4mfQ3OnlXhxDX0mMeGKTwAi73r8tLEE1oNkmOybO4/GL2bCpFnee7HL/ar4z2iRrEyf+6Pt2lVqBvI5jKzE9BgIcQV8sJaxU5lk=; bm_sv=9AA30340EA77BB4D941707A48DF2DDFA~OjTqJ8Lse2w0kT5i0KD3Cm56OxwiroQtKxsj/ReN30x9gLDo37vwl2GecYKwcveVBNZX1I3+kY08BH3iFg7wVMSpRo9yXvSkhKKdrtrIE70iAlfqZmz49l197M/2ccWcad+4gOmeyWVmCLcsAKLo89WCn/i1mCzGXv13/2bhQf4='
    }
});

console.log(x)


await fetch("https://www.amtrak.com/v2/journey-solution-option", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "x-amtrak-trace-id": "d3dfd37e4b4e4445c149b3e4f0a04b5c304b1631301128624",
        "CSRF-Token": "undefined",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "https://www.amtrak.com/home.html",
    "body": "{\"reservableAccomodationOptions\":\"ALL\",\"journeyRequest\":{\"type\":\"OW\",\"alternateDayOption\":true,\"fare\":{\"pricingUnit\":\"DOLLARS\"},\"journeyLegRequests\":[{\"origin\":{\"code\":\"ATL\",\"schedule\":{\"departureDateTime\":\"2021-09-17T00:00:00\"}},\"destination\":{\"code\":\"NYP\"},\"passengers\":[{\"id\":\"P1\",\"type\":\"F\",\"initialType\":\"adult\"}]}],\"customer\":{\"tierStatus\":\"MEMBER\"}}}",
    "method": "POST",
    "mode": "cors"
});