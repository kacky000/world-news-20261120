# world-news-20261120

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/kacky000/world-news-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/kacky000/world-news-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

One image that sums up the world's news of **Friday 20 November 2026**, drawn as a newspaper front page.

![Front page for Friday 20 November 2026](entry.png)

## What is on the page

36 stories, every one of them from that Friday: 3 drawn leads, 10 drawn cards and 23 numbered briefs, with a
pin map and a date check. The five biggest:

| Story | Where | Field |
| --- | --- | --- |
| Russian missiles strike three Kyiv bridges; at least 3 killed | Ukraine | War |
| Cyclone Akvan makes landfall near Gopalpur, Odisha | India | Disaster |
| COP31 deadlocked on its final day; draft drops fossil-fuel phase-out | Türkiye | Climate |
| AI sell-off: Taiex −6.2%, Kospi −5.2%, Nikkei −5.1% | Asia | Markets |
| UK and EU agree a post-Brexit reset deal | Brussels | Diplomacy |

The other cards: a Russian missile falling inside Poland, Italy's general strike, Japan's October inflation,
China's unchanged lending rates, Glenn Phillips's 118 against India, Alcaraz at the ATP Finals, Xi and Albanese
in Shenzhen, and the search off Senegal after a migrant boat capsized.

Stories that broke on Thursday 19 November (the Trump–Xi–Putin declaration, the ICJ's Myanmar ruling, Anthropic's
market debut, Denmark's Greenland vote, Somalia expelling the UAE ambassador) are left out on purpose and named
in the page's date check.

Every item was checked against same-day reporting (RFE/RL, Kyiv Independent, NBC News, UN News, CNN, UPI,
Bloomberg, France 24, CBS News and others) before it went on the page. Figures are the ones those reports gave.

## How it is made

- `art/build.mjs` holds the stories and every drawing, and writes the page as one 1024×1024 SVG
  (`art/front-page.html`, generated). No photographs, no logos, no copied artwork.
- `art/render.sh` runs the build and renders the page to `entry.png` with a headless Chromium browser.
- `main.ts` checks `entry.png` against the contest's limits (PNG, at most 1 MiB, at most 1024×1024) and writes the
  same bytes to `/output/entry.png`. Standard library only, no network.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=9ykrm1qx&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
