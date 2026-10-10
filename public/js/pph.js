// Tax calculator for the /kalkulator-pph page. Loads js/tax.js (built from lib/tax.ts), then fills in
// each panel's results as the visitor types.
(function () {
  var root = document.getElementById("pph");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  var here = document.currentScript ? document.currentScript.src : location.href;

  var lang = document.documentElement.lang || "id";
  var money = new Intl.NumberFormat(lang, { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  var group = new Intl.NumberFormat(lang, { maximumFractionDigits: 0 });
  var percent = new Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 2 });
  var $ = function (id) { return document.getElementById(id); };
  var num = function (id) { return Number(($(id).value || "").replace(/\D/g, "")) || 0; };

  function put(panel, values) {
    panel.querySelectorAll("[data-out]").forEach(function (dd) {
      var key = dd.getAttribute("data-out");
      var v = key.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, values);
      if (v == null) { dd.textContent = "–"; return; }
      dd.textContent = typeof v !== "number" ? v : /rate|Rate/.test(key) ? percent.format(v) : money.format(v);
    });
  }

  var calcs = {
    p21: function (T, panel) {
      var input = { grossMonthly: num("p21-gross"), otherDeductionsMonthly: num("p21-ded"), married: $("p21-married").value === "1", dependents: +$("p21-dep").value };
      var r = T.pph21Annual(input);
      r.ter = T.pph21Ter(input);
      put(panel, r);
    },
    umkm: function (T, panel) {
      var type = $("umkm-type").value;
      var r = T.pphFinalUmkm({ turnover: num("umkm-turnover"), turnoverBeforeThisPeriod: num("umkm-before"), taxpayer: type });
      put(panel, r);
      panel.querySelector('[data-show="limit"]').hidden = !r.exceedsLimit;
      panel.querySelector('[data-show="legacy"]').hidden = type.indexOf("legacy_") !== 0;
    },
    p23: function (T, panel) {
      put(panel, T.pph23({ amount: num("p23-amount"), kind: $("p23-kind").value, hasNpwp: $("p23-npwp").checked }));
    },
    p42: function (T, panel) {
      put(panel, T.pph42({ amount: num("p42-amount"), kind: $("p42-kind").value }));
    },
    ppn: function (T, panel) {
      put(panel, T.ppn({ amount: num("ppn-amount"), includesPpn: $("ppn-mode").value === "incl", luxury: $("ppn-lux").checked }));
    },
  };

  function start(T) {
    var panels = root.querySelectorAll("[data-calc]");
    panels.forEach(function (panel) {
      var run = function () { calcs[panel.dataset.calc](T, panel); };
      panel.addEventListener("input", function (e) {
        // Show money inputs with thousand separators while keeping the caret near the end.
        if (e.target.hasAttribute("data-money")) {
          var digits = e.target.value.replace(/\D/g, "");
          e.target.value = digits ? group.format(Number(digits)) : "";
        }
        run();
      });
      panel.addEventListener("change", run);
      panel.addEventListener("submit", function (e) { e.preventDefault(); });
      run();
    });

    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        $(t.getAttribute("aria-controls")).hidden = !on;
        if (on && focus) t.focus();
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select((i + d + tabs.length) % tabs.length, true);
      });
    });
    // Links like kalkulator-pph#ppn open that tab.
    var fromHash = tabs.findIndex(function (t) { return t.id === "ptab-" + location.hash.slice(1); });
    if (fromHash > 0) select(fromHash);
  }

  if (window.LegalEaseTax) return start(window.LegalEaseTax);
  var s = document.createElement("script");
  s.src = new URL("tax.js", here).href;
  s.onload = function () { start(window.LegalEaseTax); };
  document.head.appendChild(s);
})();
