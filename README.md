📘 ABS AutoConverter — Extended & Modernized Fork<br/>
A continuation of the original ABS AutoConverter, built with appreciation and respect for the foundation it provided.

This project is an extended and modernized fork of docker‑absautoconverter by cutzenfriend.<br/>
Original project: [Link](https://github.com/cutzenfriend/docker-absautoconverter)

The original project introduced the core idea that made this fork possible:<br/>
automatically converting Audiobookshelf items to m4b format with minimal user involvement.<br/>
It provided the foundation I learned from, experimented with, and eventually built upon.<br/>

This fork isn’t meant to replace the original.<br/>
It’s meant to coexist with it — a parallel version shaped around my own learning process, goals, and workflow.<br/>

Along the way, I received guidance and support from Microsoft Copilot, which helped me understand the architecture, improve the structure, and learn modern Node.js patterns. This fork reflects that collaborative learning experience.

🌱 Why This Fork Exists<br/>
As I worked with the original project, I realized I wanted to:<br/>

Understand the logic more deeply<br/>

Learn how to structure Node.js automation scripts<br/>

Add features that fit my personal workflow<br/>

Make the code easier for me to maintain and extend<br/>

This fork reflects that learning journey.<br/>
It keeps the spirit of the original while reorganizing the internals in a way that made sense for my own growth and future plans.<br/>

✨ What This Fork Adds (Built on the Original Foundation)<br/>
These changes aren’t corrections — they’re evolutions that grew naturally as I learned more about the codebase.<br/>

✔ Multi‑Library Support<br/>
✔ User‑Defined Refresh Wait<br/>
✔ Fully Async Conversion Flow<br/>
✔ Clear, Timestamped Logging<br/>
✔ Stronger Validation<br/>
✔ Modular Structure<br/>
Each of these additions came from exploring the original logic, understanding how it worked, and then extending it with help from Copilot.<br/>

🌿 Why These Changes Help (For My Use Case)<br/>
These updates make the script:<br/>

Easier for me to maintain<br/>

Easier to extend with new features<br/>

More predictable in multi‑library environments<br/>

More transparent when debugging<br/>

More flexible for different setups<br/>

But again — these are improvements for my workflow.<br/>
The original project remains a great lightweight solution for single‑library setups.<br/>

### Prerequisites

Before running you will need to create a .env file with the required environment variables. Below is a a example with comments on each. The .env file only expects the values and may break if you include comments:

```sh
DOMAIN=https://YourdomainofABS.com or ipaddress:port #Either version should work
LIBRARIES=xxxx,yyyy #Full 36 character library id separated by a coma for each library you want to apply the conversions to
TOKEN=API_token #Make sure you generate the api token.
MAX_PARALLEL_CONVERSIONS=1 #Left the default of max conversions to 5 like the original. This is also PER library, so please make sure your system can handle this many per library
BITRATE=192k #Left internal default to 128k like original. Leave blank if your fine with the default
CRON_SETTING=*/15 * * * * #Default is 20 minutes past the hour. Please use link to figure out your cron schedule. biggest headache for me. Also spaces are expected between *
LIBRARY_REFRESH_WAIT=15 #Default is 30 seconds. This is for how long do you want to wait (in seconds) before you push the encode process after the library refresh request. This solves a issue where the encode attempts to re-encode the same book. Bigger libraries should increase the wait time
TZ=US/Central #Default is UTC. Use the link below to setup your local time zone. 
```
Addional Help:</br>
[Cron Guru](https://crontab.guru/#*_*_*_*)
[TZ Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#)

🙏 Credits & Appreciation<br/>
This fork would not exist without cutzenfriend’s original work.<br/>
Their project gave me the foundation I needed to learn, experiment, and eventually build a version that fits my own needs.<br/>

I also want to acknowledge the assistance I received from Microsoft Copilot throughout this process.<br/>
Copilot helped me understand the architecture, reason through async behavior, and design a structure that is easier for me to maintain. This fork reflects that collaborative learning experience.<br/>

This is a continuation, not a replacement.<br/>
A companion, not a competitor.<br/>
And a learning project that grew from the solid groundwork laid by the original author.<br/>

📚 Sources & References<br/>
This project builds on publicly available documentation and resources from the Audiobookshelf community. These references were essential in helping me understand how the API works and how to structure the automation logic in this fork.<br/>

Audiobookshelf GitHub Repository<br/>
The official source for the Audiobookshelf server, API endpoints, and core functionality.<br/>
https://github.com/audiobookshelf/ (github.com in Bing) (bing.com in Bing)<br/>

Audiobookshelf API Documentation (DeepWiki)<br/>
A community‑maintained reference that helped clarify endpoint behavior, request formats, and expected responses.<br/>
https://deepwiki.com/audiobookshelf/audiobookshelf-api-docs (deepwiki.com in Bing) (bing.com in Bing)<br/>

These resources provided the foundation I needed to understand how Audiobookshelf handles library scans, item metadata, and conversion tools. They were invaluable during the learning process and directly informed the structure of this fork.<br/>

📄 License<br/>
This project is a fork of docker‑absautoconverter by cutzenfriend, which is released under the MIT License.<br/>
In accordance with that license, the original copyright notice and license text are preserved in this repository.<br/>

My additions and modifications are also released under the MIT License so the project remains open, accessible, and easy for others to learn from — just as the original was for me.<br/>
