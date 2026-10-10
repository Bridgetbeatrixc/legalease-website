// KBLI search for the /kbli page. Loads the code list for the chosen version, then filters it as you type.
(function () {
  var root = document.getElementById("kbli");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  var here = document.currentScript ? document.currentScript.src : location.href;
  var dataUrl = function (p) { return new URL("../data/" + p, here).href; };
  var PAGE = 50;
  var input = document.getElementById("kbliQuery");
  var select = document.getElementById("kbliSection");
  var count = document.getElementById("kbliCount");
  var list = document.getElementById("kbliList");
  var more = document.getElementById("kbliMore");
  var buttons = root.querySelectorAll("[data-version]");
  var cache = {};
  var data = null;
  var shown = 0;
  var matches = [];
  var version = "2025";

  function getJson(p) {
    return fetch(dataUrl(p)).then(function (r) {
      if (!r.ok) throw new Error(r.status + " " + p);
      return r.json();
    });
  }

  // Both versions become { sections: [{code, title}], items: [{c, t, s, d}] }.
  function load(v) {
    if (cache[v]) return Promise.resolve(cache[v]);
    var p = v === "2020"
      ? getJson("kbli-2020.json").then(function (j) { return { sections: j.sections, items: j.items }; })
      : Promise.all([getJson("kbli-2025/01_kategori.json"), getJson("kbli-2025/02_golongan_pokok.json"), getJson("kbli-2025/05_kelompok.json")])
          .then(function (r) {
            var cat = {};
            r[1].forEach(function (g) { cat[g.code] = g.kategori_code; });
            return {
              sections: r[0].map(function (k) { return { code: k.code, title: k.title }; }),
              items: r[2].map(function (k) { return { c: k.code, t: k.title, s: cat[k.code.slice(0, 2)] || "", d: k.description || "" }; }),
            };
          });
    return p.then(function (d) {
      d.items.forEach(function (it) { it.tl = it.t.toLowerCase(); it.dl = it.d.toLowerCase(); });
      cache[v] = d;
      return d;
    });
  }

  function fill(text, n) { return text.replace("{n}", n.toLocaleString(document.documentElement.lang)); }

  function search() {
    if (!data) return;
    var q = input.value.trim().toLowerCase();
    var words = q.split(/\s+/).filter(Boolean);
    var sec = select.value;
    var scored = [];
    data.items.forEach(function (it) {
      if (sec && it.s !== sec) return;
      if (!words.length) { scored.push([0, it]); return; }
      var score = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (it.c.indexOf(w) === 0) score += 4;
        else if (it.tl.indexOf(w) !== -1) score += 2;
        else if (it.dl.indexOf(w) !== -1) score += 1;
        else return;
      }
      scored.push([score, it]);
    });
    scored.sort(function (a, b) { return b[0] - a[0] || (a[1].c < b[1].c ? -1 : 1); });
    matches = scored.map(function (x) { return x[1]; });
    list.innerHTML = "";
    shown = 0;
    count.textContent = matches.length ? fill(root.dataset.count, matches.length) : root.dataset.none;
    render();
  }

  function render() {
    var frag = document.createDocumentFragment();
    matches.slice(shown, shown + PAGE).forEach(function (it) {
      var li = document.createElement("li");
      var det = document.createElement("details");
      var sum = document.createElement("summary");
      [["kbli-code", it.c], ["kbli-title", it.t], ["kbli-sec", it.s]].forEach(function (x) {
        var s = document.createElement("span");
        s.className = x[0];
        s.textContent = x[1];
        sum.appendChild(s);
      });
      det.appendChild(sum);
      var p = document.createElement("p");
      p.textContent = it.d;
      det.appendChild(p);
      li.appendChild(det);
      frag.appendChild(li);
    });
    list.appendChild(frag);
    shown = Math.min(shown + PAGE, matches.length);
    more.hidden = shown >= matches.length;
  }

  function use(v) {
    version = v;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.version === v ? "true" : "false"); });
    root.querySelectorAll("[data-for]").forEach(function (el) { el.hidden = el.dataset.for !== v; });
    count.textContent = root.dataset.loading;
    load(v).then(function (d) {
      if (version !== v) return;
      data = d;
      var keep = select.value;
      while (select.options.length > 1) select.remove(1);
      d.sections.forEach(function (s) {
        var o = document.createElement("option");
        o.value = s.code;
        o.textContent = s.code + " · " + s.title;
        select.appendChild(o);
      });
      select.value = d.sections.some(function (s) { return s.code === keep; }) ? keep : "";
      search();
    }).catch(function () { count.textContent = root.dataset.none; });
  }

  var timer;
  input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(search, 120); });
  select.addEventListener("change", search);
  more.addEventListener("click", render);
  buttons.forEach(function (b) { b.addEventListener("click", function () { if (b.dataset.version !== version) use(b.dataset.version); }); });
  use(version);
})();
