/*! Outage Hub prototype DATA — SINGLE SOURCE. ALL DATA IS FICTIONAL (real SCE-territory cities/ZIPs, invented numbers, names and times).
   Edit the data once, rebuild, then run check-data.py. Read at runtime by hierarchy.js and map.js. */
window.HUB_DATA = {
 "meta": {
  "fictional": true,
  "story_day": "Thu Sep 10, 2026",
  "note": "All names, addresses, numbers and times are fictional. Cities/ZIPs are real SCE-territory places; house numbers are invented."
 },
 "customer": {
  "name": "Elena Marquez",
  "account": "3105823230",
  "account_m": "••••••3230",
  "account_last4": "3230"
 },
 "props": {
  "maple": {
   "id": "maple",
   "street": "1847 Maple Ave",
   "city": "Pasadena",
   "zip": "91104",
   "county": "Los Angeles",
   "state": "active",
   "lat": 34.1738,
   "lng": -118.133,
   "meter": "51836038",
   "circuit": "LAKE-1247",
   "link": "S1-active.html",
   "ert": "Back by 4:45 PM PT",
   "when": "",
   "psps": null,
   "label": "1847 Maple Ave",
   "detail": "",
   "full": "1847 Maple Ave, Pasadena, CA 91104",
   "short": "1847 Maple Ave, Pasadena",
   "meter_m": "••••6038"
  },
  "lincoln": {
   "id": "lincoln",
   "street": "2210 Lincoln Ave",
   "city": "Altadena",
   "zip": "91001",
   "county": "Los Angeles",
   "state": "active",
   "lat": 34.1897,
   "lng": -118.1507,
   "meter": "40712216",
   "circuit": "ALTA-0931",
   "link": "S1-active.html",
   "ert": "Back by 6:30 PM PT",
   "when": "",
   "psps": null,
   "label": "2210 Lincoln Ave",
   "detail": "",
   "full": "2210 Lincoln Ave, Altadena, CA 91001",
   "short": "2210 Lincoln Ave, Altadena",
   "meter_m": "••••2216"
  },
  "agoura": {
   "id": "agoura",
   "street": "28 Oak Hollow Ln",
   "city": "Agoura Hills",
   "zip": "91301",
   "county": "Los Angeles",
   "state": "active",
   "lat": 34.1469,
   "lng": -118.7615,
   "meter": "73904455",
   "circuit": "AGOURA-3315",
   "link": "P1-psps-shutoff.html",
   "ert": "PSPS shut off · Back after the event ends",
   "when": "",
   "psps": "off",
   "label": "28 Oak Hollow Ln",
   "detail": "",
   "full": "28 Oak Hollow Ln, Agoura Hills, CA 91301",
   "short": "28 Oak Hollow Ln, Agoura Hills",
   "meter_m": "••••4455"
  },
  "ojai": {
   "id": "ojai",
   "street": "615 Thacher Rd",
   "city": "Ojai",
   "zip": "93023",
   "county": "Ventura",
   "state": "active",
   "lat": 34.448,
   "lng": -119.2429,
   "meter": "28450913",
   "circuit": "OJAI-0522",
   "link": "P1-psps-shutoff.html",
   "ert": "PSPS shut off · Back after the event ends",
   "when": "",
   "psps": "off",
   "label": "615 Thacher Rd",
   "detail": "",
   "full": "615 Thacher Rd, Ojai, CA 93023",
   "short": "615 Thacher Rd, Ojai",
   "meter_m": "••••0913"
  },
  "yucaipa": {
   "id": "yucaipa",
   "street": "3380 Dunlap Blvd",
   "city": "Yucaipa",
   "zip": "92399",
   "county": "San Bernardino",
   "state": "active",
   "lat": 34.0336,
   "lng": -117.0431,
   "meter": "66120784",
   "circuit": "YUCAIPA-1840",
   "link": "P1-psps-shutoff.html",
   "ert": "PSPS shut off · Back after the event ends",
   "when": "",
   "psps": "off",
   "label": "3380 Dunlap Blvd",
   "detail": "",
   "full": "3380 Dunlap Blvd, Yucaipa, CA 92399",
   "short": "3380 Dunlap Blvd, Yucaipa",
   "meter_m": "••••0784"
  },
  "elm": {
   "id": "elm",
   "street": "412 Elm St",
   "city": "Glendale",
   "zip": "91205",
   "county": "Los Angeles",
   "state": "planned",
   "lat": 34.1425,
   "lng": -118.2551,
   "meter": "33907754",
   "circuit": "GLEN-0614",
   "link": "F0-signed.html",
   "ert": "",
   "when": "Fri Sep 11 · 9:00 AM – 1:00 PM PT",
   "psps": "scheduled",
   "label": "412 Elm St",
   "detail": "",
   "full": "412 Elm St, Glendale, CA 91205",
   "short": "412 Elm St, Glendale",
   "meter_m": "••••7754"
  },
  "sycamore": {
   "id": "sycamore",
   "street": "385 Sycamore Dr",
   "city": "Pasadena",
   "zip": "91103",
   "county": "Los Angeles",
   "state": "planned",
   "lat": 34.1694,
   "lng": -118.165,
   "meter": "58261047",
   "circuit": "LAKE-1102",
   "link": "F0-signed.html",
   "ert": "",
   "when": "Sun Sep 13 · 8:00 AM – 12:00 PM PT",
   "psps": null,
   "label": "385 Sycamore Dr",
   "detail": "",
   "full": "385 Sycamore Dr, Pasadena, CA 91103",
   "short": "385 Sycamore Dr, Pasadena",
   "meter_m": "••••1047"
  },
  "canyon": {
   "id": "canyon",
   "street": "891 Canyon Rd",
   "city": "Santa Clarita",
   "zip": "91387",
   "county": "Los Angeles",
   "state": "planned",
   "lat": 34.4208,
   "lng": -118.4565,
   "meter": "62458841",
   "circuit": "SOLEDAD-2208",
   "link": "S6-psps-watch.html",
   "ert": "",
   "when": "May begin Thu Sep 10 · 8:00 PM PT",
   "psps": "potential",
   "label": "891 Canyon Rd",
   "detail": "",
   "full": "891 Canyon Rd, Santa Clarita, CA 91387",
   "short": "891 Canyon Rd, Santa Clarita",
   "meter_m": "••••8841"
  },
  "wrightwood": {
   "id": "wrightwood",
   "street": "1126 Pine Ln",
   "city": "Wrightwood",
   "zip": "92397",
   "county": "San Bernardino",
   "state": "planned",
   "lat": 34.3606,
   "lng": -117.635,
   "meter": "19375520",
   "circuit": "WRIGHT-0407",
   "link": "F10-psps-banner.html",
   "ert": "",
   "when": "May begin Thu Sep 10 · 11:00 PM PT",
   "psps": "likely",
   "label": "1126 Pine Ln",
   "detail": "",
   "full": "1126 Pine Ln, Wrightwood, CA 92397",
   "short": "1126 Pine Ln, Wrightwood",
   "meter_m": "••••5520"
  },
  "magnolia": {
   "id": "magnolia",
   "street": "1132 Magnolia Ave",
   "city": "South Pasadena",
   "zip": "91030",
   "county": "Los Angeles",
   "state": "restored",
   "lat": 34.1161,
   "lng": -118.1503,
   "meter": "84015362",
   "circuit": "SOPAS-0716",
   "link": "S9-restored.html",
   "ert": "",
   "when": "Restored today 8:52 AM PT",
   "psps": null,
   "label": "1132 Magnolia Ave",
   "detail": "",
   "full": "1132 Magnolia Ave, South Pasadena, CA 91030",
   "short": "1132 Magnolia Ave, South Pasadena",
   "meter_m": "••••5362"
  },
  "mtnview": {
   "id": "mtnview",
   "street": "640 Mountain View Ave",
   "city": "Pasadena",
   "zip": "91103",
   "county": "Los Angeles",
   "state": "restored",
   "lat": 34.1727,
   "lng": -118.1581,
   "meter": "37790289",
   "circuit": "LAKE-0988",
   "link": "S9-restored.html",
   "ert": "",
   "when": "Restored today 9:14 AM PT",
   "psps": null,
   "label": "640 Mountain View Ave",
   "detail": "",
   "full": "640 Mountain View Ave, Pasadena, CA 91103",
   "short": "640 Mountain View Ave, Pasadena",
   "meter_m": "••••0289"
  },
  "lake": {
   "id": "lake",
   "street": "2217 Walnut St",
   "city": "Pasadena",
   "zip": "91107",
   "county": "Los Angeles",
   "state": "on",
   "lat": 34.1476,
   "lng": -118.0861,
   "meter": "90548812",
   "circuit": "LAKE-1011",
   "link": "S12-weather.html",
   "ert": "",
   "when": "",
   "psps": null,
   "label": "2217 Walnut St",
   "detail": "",
   "full": "2217 Walnut St, Pasadena, CA 91107",
   "short": "2217 Walnut St, Pasadena",
   "meter_m": "••••8812"
  }
 },
 "order": [
  "maple",
  "lincoln",
  "agoura",
  "ojai",
  "yucaipa",
  "elm",
  "sycamore",
  "canyon",
  "wrightwood",
  "magnolia",
  "mtnview",
  "lake"
 ],
 "guest": {
  "orange": {
   "full": "1734 Almond Ave, Orange, CA 92867",
   "short": "1734 Almond Ave, Orange",
   "county": "Orange"
  },
  "riverside": {
   "full": "9731 Jurupa Rd, Riverside, CA 92509",
   "short": "9731 Jurupa Rd, Riverside",
   "county": "Riverside"
  },
  "tulare": {
   "full": "2045 Olive Ave, Porterville, CA 93257",
   "short": "2045 Olive Ave, Porterville",
   "county": "Tulare"
  },
  "kern": {
   "full": "318 Tehachapi Blvd, Tehachapi, CA 93561",
   "short": "318 Tehachapi Blvd, Tehachapi",
   "county": "Kern"
  },
  "ventura": {
   "full": "4420 Ralston Dr, Ventura, CA 93003",
   "short": "4420 Ralston Dr, Ventura",
   "county": "Ventura"
  }
 },
 "disc": {
  "id": "disc",
  "street": "1338 Cedar Ave",
  "city": "Whittier",
  "zip": "90601",
  "county": "Los Angeles",
  "state": "on",
  "lat": 33.9792,
  "lng": -118.0328,
  "meter": "24093917",
  "circuit": "WHIT-0663",
  "link": "S13-disconnected.html",
  "ert": "",
  "when": "",
  "psps": null,
  "label": "1338 Cedar Ave",
  "detail": "",
  "full": "1338 Cedar Ave, Whittier, CA 90601",
  "short": "1338 Cedar Ave, Whittier",
  "meter_m": "••••3917",
  "service_account": "3105824821",
  "service_account_m": "••••••4821"
 },
 "outage": {
  "id": "OUT-2026-094821",
  "cause": "Equipment failure — distribution transformer",
  "crew": "En route",
  "customers": "342",
  "reported": "7:12 AM",
  "assigned": "7:40 AM",
  "onsite": "11:30 AM",
  "restored": "4:38 PM",
  "ert": "4:45 PM",
  "ert_was": "2:30 PM",
  "duration_now": "3 hr 16 min",
  "duration_total": "9 hr 26 min",
  "updated": "10:28 AM",
  "updated_restored": "4:40 PM",
  "circuit": "LAKE-1247",
  "update_note": "Additional damaged equipment found. Estimate updated from 2:30 PM to 4:45 PM."
 },
 "prior": {
  "id": "OUT-2026-093377",
  "cause": "Tree branch on line",
  "day": "Wed Sep 9",
  "reported": "4:24 PM",
  "onsite": "5:30 PM",
  "restored": "6:42 PM",
  "duration": "2 hr 18 min",
  "reported_at": "Wed Sep 9 · 4:24 PM PT",
  "onsite_at": "Wed Sep 9 · 5:30 PM PT",
  "restored_at": "Wed Sep 9 · 6:42 PM PT",
  "dow": "Wed"
 },
 "plan": {
  "maple": {
   "id": "PLN-2026-031187",
   "window": "Sat Sep 12 · 9:00 AM – 1:00 PM PT",
   "ics_start": "20260912T090000",
   "ics_end": "20260912T130000",
   "duration": "4 hours",
   "work": "Pole replacement and line maintenance"
  }
 },
 "sched": {
  "elm": {
   "id": "PSPS-2026-007316",
   "window": "Fri Sep 11 · 9:00 AM – 1:00 PM PT",
   "ics_start": "20260911T090000",
   "ics_end": "20260911T130000",
   "duration": "4 hours",
   "reason": "Red Flag Warning · strong NE winds forecast in the Glendale foothills",
   "updated": "9:05 AM",
   "circuit": "GLEN-0614"
  }
 },
 "psps": {
  "window": "Thu Sep 10 · 8:00 PM PT",
  "ics_start": "20260910T200000",
  "ics_end": "20260911T200000",
  "updated": "10:15 AM",
  "area": "Santa Clarita foothills",
  "event": "Red Flag Warning · extreme fire weather: high winds and low humidity",
  "cause_line": "Extreme fire weather: Red Flag Warning, NE winds 34 mph with gusts to 52 mph, humidity 9%.",
  "circuit": "SOLEDAD-2208",
  "duration": "About 24–48 hours"
 },
 "likely": {
  "window": "Thu Sep 10 · 11:00 PM PT",
  "prop": "wrightwood"
 },
 "event": {
  "name": "Santa Ana Winds",
  "day": 2,
  "of": 3,
  "customers": "11,486",
  "areas": 9,
  "fire_from": "Wed Sep 9 · 6:00 PM PT",
  "fire_to": "Fri Sep 11 · 10:00 PM PT",
  "fire_window": "Wed Sep 9 · 6:00 PM PT → Fri Sep 11 · 10:00 PM PT",
  "bucket_limit": "35 mph",
  "updated": "10:28 AM"
 },
 "allclear": {
  "updated": "6:45 AM"
 },
 "report": {
  "ref": "RPT-2026-77401"
 },
 "advisory": {
  "config_default": "auto",
  "values": [
   "auto",
   "on",
   "off"
  ],
  "pages": {
   "S1-active.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Active outage on Maple Ave (Pasadena) during the Pasadena heat advisory; row is context only, the cause line stays \"Equipment failure\".",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "N1-active-planned.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Maple is still an active outage during the heat advisory; the later planned outage does not change that.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "N2-active-planned-restored.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Same as N1: the current outage is active during the heat advisory (earlier restored event is history).",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "F2-active-detail.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest detail of the active Maple outage during the Pasadena heat advisory.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "S3-no-outage.html": {
    "active": false,
    "kind": "heat",
    "key": "pasadena",
    "reason": "All clear: dashboard shows no outage, so a heat row would imply a cause for a power-out we cannot see (and contradict \"Nothing Unusual Today\").",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "S6-psps-watch.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS watch for Canyon Rd (Santa Clarita): the Red Flag / fire-weather alert is the reason for the watch.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages"
   },
   "S7-psps-active.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS event still active (Canyon Rd, power temporarily back): Red Flag conditions continue.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages"
   },
   "S9-restored.html": {
    "active": false,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Restored: good-news state, outage cause is known (equipment) so a heat row would imply a wrong cause; weather is still reachable from S12.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "S12-weather.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Weather-conditions screen: the collapsed row is the same alert the hero card expands on.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "S13-disconnected.html": {
    "active": false,
    "kind": "none",
    "key": "whittier",
    "reason": "Disconnected service is not an outage; weather is irrelevant and would imply a cause.",
    "title": "Local Weather",
    "sub": "Fire Risk: Low",
    "note": ""
   },
   "F0-signed.html": {
    "active": true,
    "kind": "fire",
    "key": "glendale",
    "reason": "Round 6: Elm St (Glendale) is now a PSPS shutoff scheduled in advance, so the Glendale Red Flag / fire-weather alert is its cause and the row shows (flipped from OFF in round 5).",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT — gusts to 47 mph may cause outages"
   },
   "F0-hub-home.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest home: public regional alert (Pasadena heat advisory is in effect today); no address or outage is claimed, so no cause is implied.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "F0-multi.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "Multi-property portfolio with PSPS-affected addresses: Red Flag / Santa Ana wind event is in effect.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages"
   },
   "F10-psps-banner.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS banner / warning for Canyon Rd: Red Flag conditions.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages"
   },
   "P1-psps-shutoff.html": {
    "active": true,
    "kind": "fire",
    "key": "agoura",
    "reason": "Active PSPS shut off at Agoura Hills: the fire-weather alert is the known cause.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": ""
   },
   "F1-lookup-result.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest lookup: default result is Maple (active outage, Pasadena heat advisory). The flag follows the shown result, see ADVISORY_F1.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   }
  },
  "f1": {
   "maple": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Active outage on Maple Ave during the Pasadena heat advisory.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "elm": {
    "active": true,
    "kind": "fire",
    "key": "glendale",
    "reason": "Round 6: Elm St is a scheduled PSPS shutoff in Glendale; the Red Flag / fire-weather alert is the reason (flipped from OFF in round 5).",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT — gusts to 47 mph may cause outages"
   },
   "canyon": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS-potential address (Santa Clarita): Red Flag conditions.",
    "title": "Fire Weather Alert",
    "sub": "Fire Risk: High",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages"
   },
   "on": {
    "active": false,
    "kind": "none",
    "key": "g_{guest}",
    "reason": "Guest lookup of a home with power on and no weather event at that location.",
    "title": "",
    "sub": "",
    "note": ""
   },
   "restored": {
    "active": false,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Restored outage lookup: event over, cause known; no row.",
    "title": "Heat Advisory",
    "sub": "Fire Risk: Elevated",
    "note": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages"
   },
   "area": {
    "active": false,
    "kind": "none",
    "key": "g_tulare",
    "reason": "Area-level (meter) match: cause unknown and no location-specific event, so no row.",
    "title": "Local Weather",
    "sub": "Fire Risk: Moderate",
    "note": ""
   },
   "oot": {
    "active": false,
    "kind": "none",
    "key": null,
    "reason": "Outside SCE service area: no location to give weather for.",
    "title": "",
    "sub": "",
    "note": ""
   },
   "none": {
    "active": false,
    "kind": "none",
    "key": null,
    "reason": "No match: no location to give weather for.",
    "title": "",
    "sub": "",
    "note": ""
   }
  }
 },
 "area": {
  "label": "Porterville area (approximate)",
  "meter_search": "4829173",
  "ert": "Back by 7:15 PM PT",
  "updated": "10:28 AM",
  "zip": "93257"
 },
 "weather": {
  "pasadena": {
   "temp": "98°F",
   "hum": "14%",
   "wind": "W 12 mph",
   "gust": "28 mph",
   "banner": "Heat advisory in Pasadena until Fri Sep 11 · 8:00 PM PT — higher demand may cause outages",
   "note": "Heat raises demand and can cause outages.",
   "risk": "Elevated",
   "title": "Heat Advisory"
  },
  "agoura": {
   "temp": "86°F",
   "hum": "8%",
   "wind": "NE 31 mph",
   "gust": "58 mph",
   "note": "Strong, dry wind is why your power is shut off and may stay off until it is safe.",
   "risk": "High",
   "title": "Fire Weather Alert"
  },
  "multi": {
   "banner": "Red Flag Warning in your PSPS areas until Fri Sep 11 · 10:00 PM PT — strong NE winds may cause more outages"
  },
  "santaclarita": {
   "banner": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT — gusts to 52 mph may cause outages",
   "temp": "91°F",
   "hum": "9%",
   "wind": "NE 34 mph",
   "gust": "52 mph",
   "note": "Strong, dry wind is why a shutoff may be needed or stay active.",
   "risk": "High",
   "title": "Fire Weather Alert"
  },
  "glendale": {
   "temp": "89°F",
   "hum": "11%",
   "wind": "NE 29 mph",
   "gust": "47 mph",
   "banner": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT — gusts to 47 mph may cause outages",
   "note": "Strong, dry wind is why a shutoff is scheduled.",
   "risk": "High",
   "title": "Fire Weather Alert"
  },
  "whittier": {
   "temp": "84°F",
   "hum": "38%",
   "wind": "SW 7 mph",
   "gust": "13 mph",
   "note": "No weather impact expected on service.",
   "risk": "Low",
   "title": "Local Weather"
  },
  "g_orange": {
   "temp": "82°F",
   "hum": "41%",
   "wind": "W 7 mph",
   "gust": "14 mph",
   "note": "No weather impact expected on service.",
   "risk": "Low",
   "title": "Local Weather"
  },
  "g_kern": {
   "temp": "88°F",
   "hum": "22%",
   "wind": "W 14 mph",
   "gust": "24 mph",
   "note": "No weather impact expected on service.",
   "risk": "Moderate",
   "title": "Local Weather"
  },
  "g_riverside": {
   "temp": "91°F",
   "hum": "24%",
   "wind": "W 10 mph",
   "gust": "19 mph",
   "note": "No weather impact expected on service.",
   "risk": "Moderate",
   "title": "Local Weather"
  },
  "g_ventura": {
   "temp": "74°F",
   "hum": "58%",
   "wind": "SW 8 mph",
   "gust": "15 mph",
   "note": "No weather impact expected on service.",
   "risk": "Low",
   "title": "Local Weather"
  },
  "g_tulare": {
   "temp": "93°F",
   "hum": "19%",
   "wind": "NW 9 mph",
   "gust": "16 mph",
   "note": "No weather impact expected on service.",
   "risk": "Moderate",
   "title": "Local Weather"
  },
  "forecast": [
   [
    "Thu Sep 10",
    "High fire risk"
   ],
   [
    "Fri Sep 11",
    "High fire risk"
   ],
   [
    "Sat Sep 12",
    "Elevated"
   ]
  ]
 },
 "maplayers": {
  "active": {
   "center": [
    34.1469,
    -118.7615
   ],
   "r": 4200,
   "label": "Active Shut Off"
  },
  "potential": {
   "center": [
    34.4208,
    -118.4565
   ],
   "r": 3600,
   "label": "Potential Shut Off"
  },
  "likely": {
   "center": [
    34.3606,
    -117.635
   ],
   "r": 5200,
   "label": "Likely Shut Off"
  },
  "scheduled": {
   "center": [
    34.1425,
    -118.2551
   ],
   "r": 2000,
   "label": "Scheduled Shut Off"
  }
 },
 "report_props": {
  "signed": [
   "maple",
   "lake",
   "elm",
   "canyon",
   "agoura",
   "disc"
  ],
  "multi": [
   "maple",
   "lincoln",
   "agoura",
   "ojai",
   "yucaipa",
   "elm",
   "sycamore",
   "canyon",
   "wrightwood",
   "magnolia",
   "mtnview",
   "lake"
  ]
 },
 "recent": [
  {
   "addr": "1847 Maple Ave, Pasadena",
   "when": "Looked up today",
   "state": "off",
   "q": "1847 Maple Ave"
  },
  {
   "addr": "1734 Almond Ave, Orange",
   "when": "Wed Sep 9",
   "state": "on",
   "q": "Almond Ave Orange"
  },
  {
   "addr": "318 Tehachapi Blvd, Tehachapi",
   "when": "Mon Sep 7",
   "state": "on",
   "q": "Tehachapi Blvd"
  }
 ],
 "outlook": [
  [
   "Wed Sep 9",
   "Wed",
   "Sep 9",
   "Low",
   "low dim"
  ],
  [
   "Thu Sep 10",
   "Thu",
   "Sep 10",
   "Elevated",
   "elevated"
  ],
  [
   "Fri Sep 11",
   "Fri",
   "Sep 11",
   "High",
   "high"
  ],
  [
   "Sat Sep 12",
   "Sat",
   "Sep 12",
   "High",
   "high"
  ],
  [
   "Sun Sep 13",
   "Sun",
   "Sep 13",
   "Elevated",
   "elevated"
  ],
  [
   "Mon Sep 14",
   "Mon",
   "Sep 14",
   "Low",
   "low dim"
  ],
  [
   "Tue Sep 15",
   "Tue",
   "Sep 15",
   "Low",
   "low dim"
  ]
 ],
 "counts": {
  "active": 5,
  "planned": 4,
  "restored": 2,
  "on": 1,
  "total": 12,
  "attention": 9
 },
 "psps_tiers": {
  "off": [
   "agoura",
   "ojai",
   "yucaipa"
  ],
  "likely": [
   "wrightwood"
  ],
  "potential": [
   "canyon"
  ]
 },
 "psps_counts": {
  "off": 3,
  "likely": 1,
  "potential": 1
 },
 "banner": {
  "title": "Santa Ana Winds – Day 2 of 3",
  "text": "11,486 homes and businesses are without power across 9 areas."
 },
 "fire": "Increased fire risk conditions are expected from <b>Wed Sep 9 · 6:00 PM PT</b> until <b>Fri Sep 11 · 10:00 PM PT</b> (estimated)",
 "status": {
  "normal": {
   "header": "ON",
   "label": "SERVICE NORMAL",
   "legend": "Service Normal",
   "chip": "",
   "icon": "on"
  },
  "restored": {
   "header": "ON",
   "label": "POWER RESTORED",
   "legend": "Power Restored",
   "chip": "",
   "icon": "on"
  },
  "restoring": {
   "header": "ON",
   "label": "POWER BACK, EVENT NOT OVER",
   "legend": "Power Back, Event Not Over",
   "chip": "PSPS",
   "icon": "on"
  },
  "active": {
   "header": "OFF",
   "label": "ACTIVE OUTAGE",
   "legend": "Active Outage",
   "chip": "Repair",
   "icon": "active"
  },
  "psps_active": {
   "header": "OFF",
   "label": "ACTIVE SHUT OFF",
   "legend": "Active Shut Off",
   "chip": "PSPS",
   "icon": "active"
  },
  "potential": {
   "header": "ON",
   "label": "POTENTIAL SHUT OFF",
   "legend": "Potential Shut Off",
   "chip": "PSPS",
   "icon": "potential"
  },
  "likely": {
   "header": "ON",
   "label": "LIKELY SHUT OFF",
   "legend": "Likely Shut Off",
   "chip": "PSPS",
   "icon": "likely"
  },
  "scheduled": {
   "header": "ON",
   "label": "SCHEDULED SHUT OFF",
   "legend": "Scheduled Shut Off",
   "chip": "PSPS",
   "icon": "scheduled"
  },
  "disconnected": {
   "header": "OFF",
   "label": "SERVICE DISCONNECTED",
   "legend": "Service Disconnected",
   "chip": "",
   "icon": "disc"
  },
  "planned": {
   "header": "ON",
   "label": "PLANNED OUTAGE",
   "legend": "Planned Outage",
   "chip": "Planned",
   "icon": "planned"
  }
 },
 "status_order": [
  "active",
  "potential",
  "likely",
  "scheduled"
 ],
 "status_colors": {
  "active": "#BA0000",
  "potential": "#CC6006",
  "likely": "#DE6C0C",
  "scheduled": "#0459D2",
  "on": "#0C7E3C",
  "disc": "#5F6672",
  "planned": "#0459D2"
 }
};
