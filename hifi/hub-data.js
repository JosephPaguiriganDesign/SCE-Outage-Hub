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
   "meter_m": "••••6038",
   "status_key": "active",
   "chip": "Repair",
   "line": "Back by 4:45 PM PT"
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
   "meter_m": "••••2216",
   "status_key": "active",
   "chip": "Repair",
   "line": "Back by 6:30 PM PT"
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
   "ert": "Shutoff (PSPS) · Back after lines are checked",
   "when": "",
   "psps": "off",
   "label": "28 Oak Hollow Ln",
   "detail": "",
   "full": "28 Oak Hollow Ln, Agoura Hills, CA 91301",
   "short": "28 Oak Hollow Ln, Agoura Hills",
   "meter_m": "••••4455",
   "status_key": "psps_active",
   "chip": "PSPS",
   "line": "Shutoff (PSPS) · Back after lines are checked"
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
   "ert": "Shutoff (PSPS) · Back after lines are checked",
   "when": "",
   "psps": "off",
   "label": "615 Thacher Rd",
   "detail": "",
   "full": "615 Thacher Rd, Ojai, CA 93023",
   "short": "615 Thacher Rd, Ojai",
   "meter_m": "••••0913",
   "status_key": "psps_active",
   "chip": "PSPS",
   "line": "Shutoff (PSPS) · Back after lines are checked"
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
   "ert": "Shutoff (PSPS) · Back after lines are checked",
   "when": "",
   "psps": "off",
   "label": "3380 Dunlap Blvd",
   "detail": "",
   "full": "3380 Dunlap Blvd, Yucaipa, CA 92399",
   "short": "3380 Dunlap Blvd, Yucaipa",
   "meter_m": "••••0784",
   "status_key": "psps_active",
   "chip": "PSPS",
   "line": "Shutoff (PSPS) · Back after lines are checked"
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
   "meter_m": "••••7754",
   "status_key": "scheduled",
   "chip": "PSPS",
   "line": "Fri Sep 11 · 9:00 AM – 1:00 PM PT"
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
   "when": "Sun Sep 13 · 8:00 AM – noon PT",
   "psps": null,
   "label": "385 Sycamore Dr",
   "detail": "",
   "full": "385 Sycamore Dr, Pasadena, CA 91103",
   "short": "385 Sycamore Dr, Pasadena",
   "meter_m": "••••1047",
   "status_key": "planned",
   "chip": "Planned",
   "line": "Sun Sep 13 · 8:00 AM – noon PT"
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
   "when": "Could start Thu Sep 10 · 8:00 PM PT",
   "psps": "potential",
   "label": "891 Canyon Rd",
   "detail": "",
   "full": "891 Canyon Rd, Santa Clarita, CA 91387",
   "short": "891 Canyon Rd, Santa Clarita",
   "meter_m": "••••8841",
   "status_key": "potential",
   "chip": "PSPS",
   "line": "Could start Thu Sep 10 · 8:00 PM PT"
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
   "when": "Could start Thu Sep 10 · 11:00 PM PT",
   "psps": "likely",
   "label": "1126 Pine Ln",
   "detail": "",
   "full": "1126 Pine Ln, Wrightwood, CA 92397",
   "short": "1126 Pine Ln, Wrightwood",
   "meter_m": "••••5520",
   "status_key": "likely",
   "chip": "PSPS",
   "line": "Could start Thu Sep 10 · 11:00 PM PT"
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
   "when": "Power back today at 8:52 AM PT",
   "psps": null,
   "label": "1132 Magnolia Ave",
   "detail": "",
   "full": "1132 Magnolia Ave, South Pasadena, CA 91030",
   "short": "1132 Magnolia Ave, South Pasadena",
   "meter_m": "••••5362",
   "status_key": "restored",
   "chip": "",
   "line": "Power back today at 8:52 AM PT"
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
   "when": "Power back today at 9:14 AM PT",
   "psps": null,
   "label": "640 Mountain View Ave",
   "detail": "",
   "full": "640 Mountain View Ave, Pasadena, CA 91103",
   "short": "640 Mountain View Ave, Pasadena",
   "meter_m": "••••0289",
   "status_key": "restored",
   "chip": "",
   "line": "Power back today at 9:14 AM PT"
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
   "meter_m": "••••8812",
   "status_key": "normal",
   "chip": "",
   "line": "No outage known"
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
  "cause": "Equipment problem (transformer)",
  "cause_line": "Cause: equipment problem (transformer)",
  "crew": "On the way",
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
  "update_note": "Crews found more damaged equipment. New estimate: 4:45 PM PT (was 2:30 PM PT)."
 },
 "prior": {
  "id": "OUT-2026-093377",
  "cause": "Tree branch on a power line",
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
   "work": "Replacing a pole and fixing lines"
  }
 },
 "sched": {
  "elm": {
   "id": "PSPS-2026-007316",
   "window": "Fri Sep 11 · 9:00 AM – 1:00 PM PT",
   "ics_start": "20260911T090000",
   "ics_end": "20260911T130000",
   "duration": "4 hours",
   "reason": "Red Flag Warning. Strong winds expected in the Glendale foothills.",
   "updated": "9:05 AM",
   "next_update": "Thu Sep 10 · 6:00 PM PT",
   "circuit": "GLEN-0614"
  }
 },
 "psps": {
  "window": "Thu Sep 10 · 8:00 PM PT",
  "ics_start": "20260910T200000",
  "ics_end": "20260911T200000",
  "updated": "10:15 AM",
  "area": "Santa Clarita foothills",
  "event": "Red Flag Warning: strong winds and very dry air",
  "cause_line": "Red Flag Warning: wind 34 mph from the northeast, gusts up to 52 mph, humidity 9%.",
  "circuit": "SOLEDAD-2208",
  "duration": "about 24–48 hours (estimate)",
  "next_update": "Thu Sep 10 · 6:00 PM PT"
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
  "fire_from_short": "Wed Sep 9 · 6:00 PM",
  "fire_to": "Fri Sep 11 · 10:00 PM PT",
  "next_update": "Thu Sep 10 · 6:00 PM PT",
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
    "reason": "Active outage on Maple Ave (Pasadena) during the Pasadena heat advisory; row is context only, the cause line stays \"Equipment problem (transformer)\".",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "N1-active-planned.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Maple is still an active outage during the heat advisory; the later planned outage does not change that.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "N2-active-planned-restored.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Same as N1: the current outage is active during the heat advisory (earlier restored event is history).",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "F2-active-detail.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest detail of the active Maple outage during the Pasadena heat advisory.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "S3-no-outage.html": {
    "active": false,
    "kind": "heat",
    "key": "pasadena",
    "reason": "All clear: dashboard shows no outage, so a heat row would imply a cause for a power-out we cannot see (and contradict \"Nothing Unusual Today\").",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "S6-psps-watch.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS watch for Canyon Rd (Santa Clarita): the Red Flag / fire-weather alert is the reason for the watch.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
   },
   "S7-psps-active.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS event still active (Canyon Rd, power temporarily back): Red Flag conditions continue.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
   },
   "S9-restored.html": {
    "active": false,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Restored: good-news state, outage cause is known (equipment) so a heat row would imply a wrong cause; weather is still reachable from S12.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "S12-weather.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Weather-conditions screen: the collapsed row is the same alert the hero card expands on.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "S13-disconnected.html": {
    "active": false,
    "kind": "none",
    "key": "whittier",
    "reason": "Disconnected service is not an outage; weather is irrelevant and would imply a cause.",
    "title": "Local weather",
    "sub": "Fire risk: low",
    "note": ""
   },
   "F0-signed.html": {
    "active": true,
    "kind": "fire",
    "key": "glendale",
    "reason": "Round 6: Elm St (Glendale) is now a PSPS shutoff scheduled in advance, so the Glendale Red Flag / fire-weather alert is its cause and the row shows (flipped from OFF in round 5).",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT. Wind gusts up to 47 mph."
   },
   "F0-hub-home.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest home: public regional alert (Pasadena heat advisory is in effect today); no address or outage is claimed, so no cause is implied.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "F0-multi.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "Multi-property portfolio with PSPS-affected addresses: Red Flag / Santa Ana wind event is in effect.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
   },
   "F10-psps-banner.html": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS banner / warning for Canyon Rd: Red Flag conditions.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
   },
   "P2-psps-restoring.html": {
    "active": true,
    "kind": "fire",
    "key": "agoura",
    "reason": "ut10 NEW-02: same Agoura Hills shutoff as P1, crews are checking the lines; the fire-weather alert is still the known cause.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": ""
   },
   "P3-psps-canceled.html": {
    "active": false,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "ut10 NEW-01: the shutoff for Canyon Rd is canceled; the dashboard says service is normal, so no cause row (weather stays reachable from S12).",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
   },
   "S1-no-estimate.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "ut10 NEW-05: same active Maple outage as S1 with no estimate yet; the heat row is context only.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "P1-psps-shutoff.html": {
    "active": true,
    "kind": "fire",
    "key": "agoura",
    "reason": "Active PSPS shut off at Agoura Hills: the fire-weather alert is the known cause.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": ""
   },
   "F1-lookup-result.html": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Guest lookup: default result is Maple (active outage, Pasadena heat advisory). The flag follows the shown result, see ADVISORY_F1.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   }
  },
  "f1": {
   "maple": {
    "active": true,
    "kind": "heat",
    "key": "pasadena",
    "reason": "Active outage on Maple Ave during the Pasadena heat advisory.",
    "title": "Heat Advisory",
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "elm": {
    "active": true,
    "kind": "fire",
    "key": "glendale",
    "reason": "Round 6: Elm St is a scheduled PSPS shutoff in Glendale; the Red Flag / fire-weather alert is the reason (flipped from OFF in round 5).",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT. Wind gusts up to 47 mph."
   },
   "canyon": {
    "active": true,
    "kind": "fire",
    "key": "santaclarita",
    "reason": "PSPS-potential address (Santa Clarita): Red Flag conditions.",
    "title": "Red Flag Warning",
    "sub": "Fire risk: high",
    "note": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph."
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
    "sub": "Fire risk: elevated",
    "note": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages."
   },
   "area": {
    "active": false,
    "kind": "none",
    "key": "g_tulare",
    "reason": "Area-level (meter) match: cause unknown and no location-specific event, so no row.",
    "title": "Local weather",
    "sub": "Fire risk: moderate",
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
   "wind_say": "12 miles per hour from the west",
   "banner": "Heat Advisory in Pasadena until Fri Sep 11 · 8:00 PM PT. High demand may cause outages.",
   "note": "Heat raises power use and can cause outages.",
   "risk": "elevated",
   "title": "Heat Advisory",
   "wind_from": "12 mph from the west"
  },
  "agoura": {
   "temp": "86°F",
   "hum": "8%",
   "wind": "NE 31 mph",
   "gust": "58 mph",
   "wind_say": "31 miles per hour from the northeast",
   "note": "Strong, dry wind is why your power is shut off and may stay off until it is safe.",
   "risk": "high",
   "title": "Red Flag Warning",
   "wind_from": "31 mph from the northeast"
  },
  "multi": {
   "banner": "Red Flag Warning near your addresses until Fri Sep 11 · 10:00 PM PT. More shutoffs are possible."
  },
  "santaclarita": {
   "banner": "Red Flag Warning for the Santa Clarita Valley until Fri Sep 11 · 6:00 PM PT. Wind gusts up to 52 mph.",
   "temp": "91°F",
   "hum": "9%",
   "wind": "NE 34 mph",
   "gust": "52 mph",
   "wind_say": "34 miles per hour from the northeast",
   "note": "Strong, dry wind is why a shutoff may happen or continue.",
   "risk": "high",
   "title": "Red Flag Warning",
   "wind_from": "34 mph from the northeast"
  },
  "glendale": {
   "temp": "89°F",
   "hum": "11%",
   "wind": "NE 29 mph",
   "gust": "47 mph",
   "wind_say": "29 miles per hour from the northeast",
   "banner": "Red Flag Warning for the Glendale foothills until Fri Sep 11 · 2:00 PM PT. Wind gusts up to 47 mph.",
   "note": "Strong, dry wind is why a shutoff is expected.",
   "risk": "high",
   "title": "Red Flag Warning",
   "wind_from": "29 mph from the northeast"
  },
  "whittier": {
   "temp": "84°F",
   "hum": "38%",
   "wind": "SW 7 mph",
   "gust": "13 mph",
   "wind_say": "7 miles per hour from the southwest",
   "note": "No weather problems expected for your power.",
   "risk": "low",
   "title": "Local weather",
   "wind_from": "7 mph from the southwest"
  },
  "g_orange": {
   "temp": "82°F",
   "hum": "41%",
   "wind": "W 7 mph",
   "gust": "14 mph",
   "wind_say": "7 miles per hour from the west",
   "note": "No weather problems expected for your power.",
   "risk": "low",
   "title": "Local weather",
   "wind_from": "7 mph from the west"
  },
  "g_kern": {
   "temp": "88°F",
   "hum": "22%",
   "wind": "W 14 mph",
   "gust": "24 mph",
   "wind_say": "14 miles per hour from the west",
   "note": "No weather problems expected for your power.",
   "risk": "moderate",
   "title": "Local weather",
   "wind_from": "14 mph from the west"
  },
  "g_riverside": {
   "temp": "91°F",
   "hum": "24%",
   "wind": "W 10 mph",
   "gust": "19 mph",
   "wind_say": "10 miles per hour from the west",
   "note": "No weather problems expected for your power.",
   "risk": "moderate",
   "title": "Local weather",
   "wind_from": "10 mph from the west"
  },
  "g_ventura": {
   "temp": "74°F",
   "hum": "58%",
   "wind": "SW 8 mph",
   "gust": "15 mph",
   "wind_say": "8 miles per hour from the southwest",
   "note": "No weather problems expected for your power.",
   "risk": "low",
   "title": "Local weather",
   "wind_from": "8 mph from the southwest"
  },
  "g_tulare": {
   "temp": "93°F",
   "hum": "19%",
   "wind": "NW 9 mph",
   "gust": "16 mph",
   "wind_say": "9 miles per hour from the northwest",
   "note": "No weather problems expected for your power.",
   "risk": "moderate",
   "title": "Local weather",
   "wind_from": "9 mph from the northwest"
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
   "label": "Active outage"
  },
  "potential": {
   "center": [
    34.4208,
    -118.4565
   ],
   "r": 3600,
   "label": "Potential shut off"
  },
  "likely": {
   "center": [
    34.3606,
    -117.635
   ],
   "r": 5200,
   "label": "Likely shut off"
  },
  "scheduled": {
   "center": [
    34.1425,
    -118.2551
   ],
   "r": 2000,
   "label": "Scheduled shut off"
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
   "when": "today",
   "state": "off",
   "q": "1847 Maple Ave",
   "ref": "maple",
   "status_key": "active",
   "chip": "Repair",
   "line": "Back by 4:45 PM PT"
  },
  {
   "addr": "1734 Almond Ave, Orange",
   "when": "Wed Sep 9",
   "state": "on",
   "q": "Almond Ave Orange",
   "ref": "orange",
   "status_key": "normal",
   "chip": "",
   "line": "No outage known"
  },
  {
   "addr": "318 Tehachapi Blvd, Tehachapi",
   "when": "Mon Sep 7",
   "state": "on",
   "q": "Tehachapi Blvd",
   "ref": "kern",
   "status_key": "normal",
   "chip": "",
   "line": "No outage known"
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
 "fire": "High fire risk expected <b>Wed Sep 9 · 6:00 PM</b> until <b>Fri Sep 11 · 10:00 PM PT</b> (estimate).",
 "copy": {
  "dl_title": "Stay at least 100 feet away. Keep others away.",
  "dl_body": "Call 911 immediately. Treat every downed line as live.",
  "dl_hint": "Stay 100 ft away · Call 911 ·",
  "dl_hint_link": "Safety tips",
  "emerg_title": "Emergency?",
  "emerg_line": "Downed line, fire, gas smell or someone hurt",
  "emerg_btn": "CALL 911",
  "emerg_aria": "Emergency",
  "dl_detect_title": "This sounds like a downed power line.",
  "dl_detect_body": "Stay 100 feet away and call 911. We switched you to the downed line report.",
  "dl_promo_title": "See a downed power line?",
  "dl_promo_body": "Stay 100 feet away and call 911. Then report it here.",
  "dl_wire": "See a downed wire? Stay at least 100 feet away and call 911.",
  "dl_conf_title": "Stay away and keep others away.",
  "dl_conf_body": "Stay at least 100 feet away. If you haven’t yet, call 911.",
  "dl_conf_next": "Keep everyone away from the line. We may call you at the number you gave.",
  "upd_today": "Updated today at {t} PT",
  "upd_day": "Updated {d} at {t} PT",
  "lag": "Status can take up to 20 minutes to update.",
  "lag_map": "The map can take up to 20 minutes to update.",
  "lag_report": "Your report can take up to 20 minutes to show in the Outage Center.",
  "pending_title": "Report sent",
  "pending_body": "Report # RPT-2026-77401 · It can take up to 20 minutes to show here.",
  "search_ph": "Address, outage # or meter #",
  "search_aria": "Search by address, outage number or meter number",
  "acct_line": "Account ••••••3230",
  "acct_say": "Account ending in 3230",
  "k_holder": "Name on account",
  "k_acct": "Account number",
  "k_meter": "Meter number",
  "menu_help": "Help and support",
  "menu_addr": "Your addresses",
  "foot_links": [
   "Privacy",
   "Terms of use",
   "Accessibility"
  ],
  "my_account": "My account",
  "psps_line": "Power is shut off to help prevent a wildfire. This is a Public Safety Power Shutoff (PSPS).",
  "psps_power_back": "Power back: after the fire risk ends and crews check the lines. This can take up to 8 hours.",
  "psps_restoring": "Crews are checking the lines so they can turn power back on. This can take up to 8 hours.",
  "psps_canceled": "The shutoff for this address is canceled. Your power will stay on.",
  "next_update": "Next update by {t}",
  "sched_line": "Power is expected to be shut off <b data-f=\"win\">{w}</b> (estimate).",
  "pot_line": "Could start as early as <b data-f=\"win\">{w}</b> if the weather gets worse.",
  "pot_prep": "Get ready now. It could start with little notice.",
  "likely_line": "A shutoff is likely. It could start as early as <b>{w}</b>.",
  "likely_prep": "Get ready now. Charge devices and plan for medical needs.",
  "sched_prep": "Get ready before it starts.",
  "restoring_line": "Your power is back on, but it could go off again. The shutoff isn’t over yet.",
  "restored_line": "Power came back today at {t} PT.",
  "restored_dur": " The outage lasted {d}.",
  "restored_end": " The shutoff is over.",
  "disc_line": "This is not an outage. Service at this address is disconnected.",
  "multi_count": "Power is shut off at <b>3</b> of your addresses for a Public Safety Power Shutoff (PSPS).",
  "ert_label": "Estimate (may change)",
  "ert_changed": "Changed from",
  "ert_none": "Not known yet. We’ll post one after a crew checks the damage.",
  "ert_range": "Back between 4:00 and 6:00 PM PT",
  "toggle_open": "Hide details",
  "toggle_closed": "View details",
  "show_fewer": "Show fewer",
  "show_all": "Show all {n}",
  "k_event": "Event",
  "k_why": "Why",
  "k_circuit": "Circuit",
  "k_how_long": "How long",
  "k_area": "Area",
  "k_could_last": "Could last",
  "s6_area": "power lines that serve your neighborhood",
  "chip_psps_say": "Public Safety Power Shutoff",
  "help_repair": "Need help during this outage?",
  "help_ready": "Need help getting ready?",
  "help_shutoff": "Need help during this shutoff?",
  "help_s12": "Get ready for outages",
  "help_aria": "Help and support",
  "help_211": "Free help with food, shelter, rides and more. Or text PREPARE to 211-211.",
  "help_mbl": "Medical Baseline program",
  "help_food": "Food and shelter",
  "help_todo": "What to do now",
  "help_crc": "Find a Community Resource Center",
  "help_call": "Questions? Call SCE any time: 1-800-611-1911",
  "sce_phone": "1-800-611-1911",
  "mb_title": "If you use medical equipment",
  "mb_aria": "Medical equipment safety tips",
  "mb_active": [
   "If anyone’s life is in danger, call 911 now.",
   "Switch your medical equipment to backup power.",
   "Need a place to go? Call 211."
  ],
  "mb_s7": [
   "If anyone’s life is in danger, call 911.",
   "Power could go off again. Keep backup power ready.",
   "Need help? Call 211."
  ],
  "mb_ready": [
   "Charge medical devices and backup batteries now.",
   "Plan where you can go if your equipment needs power.",
   "Need help getting ready? Call 211."
  ],
  "mb_link": "Medical Baseline and backup power",
  "step1_d": "We know about the outage in your area and are working on it.",
  "step2_t": "Checking damage",
  "step2_d": "A crew is checking what caused the outage. Many outages are fixed at this step.",
  "step2_wind": "Winds are too strong for bucket trucks right now, so crews are checking the lines by driving them.",
  "step4_d": "A crew is fixing the problem.",
  "pill_done": "Done",
  "pill_now": "Now",
  "pill_todo": "Not started",
  "stale_title": "We can’t refresh right now.",
  "stale_body": "This is the last info we have, from today at {t} PT.",
  "snack_updated": "Updated today at {t} PT",
  "snack_estimate": "Checking for a new estimate…",
  "k_crew": "Crew",
  "k_cust": "Customers out",
  "k_out_for": "Out for",
  "cust_suffix": "",
  "dur_suffix": " so far",
  "k_latest": "Latest update:",
  "btn_details": "View details",
  "s3_banner_t": "No large outages right now",
  "s3_banner": "Is your power out? Report it below.",
  "s3_note": "Is your power out? Report it, even if a neighbor already did.",
  "s3_downed": "Report a downed power line",
  "s3_hazard": "Report another hazard",
  "s12_now": "Weather now · Pasadena",
  "s12_wind": "Wind 12 mph from the west",
  "s12_gust": "Gusts up to {g}",
  "s12_impact_k": "How this could affect your power",
  "s12_impact": "Heat raises power use and can cause outages. Strong, dry wind can lead SCE to shut off power to help prevent a wildfire. This is called a Public Safety Power Shutoff (PSPS).",
  "s12_next": "Next few days",
  "prep_title": "How to get ready",
  "prep_list": [
   "Charge phones, batteries and medical devices.",
   "Pack a bag in case you need to leave.",
   "Plan a ride, and check on neighbors who may need help."
  ],
  "prep_unplug": "Unplug TVs and computers before it starts.",
  "cal_add": "Add to calendar",
  "remind": "Remind me before it starts",
  "remind_settings": "Change reminders in Notifications.",
  "snack_remind_on": "We’ll remind you before it starts.",
  "snack_remind_off": "Reminder off.",
  "snack_cal": "Added to your calendar.",
  "lang_line": "Language: English",
  "lang_change": "Change",
  "s6_before_k": "Before the shutoff ends",
  "s7_temp": "Your power is back on, but it could go off again. The shutoff isn’t over yet.",
  "s7_before": [
   "The weather must calm down.",
   "Crews must check the power lines.",
   "We’ll tell you when it’s over."
  ],
  "s7_safe_t": "Stay safe while power comes back",
  "s7_safety": [
   "Power may go off and on while crews bring the lines back.",
   "See a downed wire? Stay at least 100 feet away and call 911.",
   "Keep backup power and medical equipment ready."
  ],
  "s7_aria": "Safety tips",
  "s9_tl_k": "What happened today (PT)",
  "s9_reported": "Outage reported",
  "s9_assigned": "Crew assigned",
  "s9_onsite": "Crew on site",
  "s9_back": "Power back on",
  "s9_past_k": "Past outages",
  "s9_past_btn": "Search past outages",
  "n1_planned_t": "PLANNED OUTAGE",
  "n1_sep": "This is separate from your current outage.",
  "k_when": "When",
  "k_work": "Work",
  "k_plan_no": "Planned work number",
  "planned_work": "Replacing a pole and fixing lines",
  "n2_row": "Earlier outage (over)",
  "n2_sep": "This outage is over. It isn’t your current outage.",
  "n2_tl_k": "What happened",
  "n2_lookback": "Shown for {d} days after power comes back. For older outages, use Outage Search.",
  "s13_k": "To turn service back on",
  "s13_l1": "Call SCE customer service.",
  "s13_l2": "Have your account number ready.",
  "s13_btn": "CALL CUSTOMER SERVICE",
  "s13_other": "You can still report a downed line or another hazard.",
  "f0_guest": "Check any address, outage # or meter #. No account needed.",
  "f0_signin": "SIGN IN",
  "f0_recent_k": "Recent searches",
  "f0_clear": "Clear",
  "f0_none": "No recent searches.",
  "f0_checked": "Checked {w}: {s}",
  "f1_results": "Results for",
  "f1_results_outage": "Results for outage #",
  "f1_area": "Area match:",
  "f1_alerts_t": "Get alerts for this address",
  "f1_alerts_btn": "SIGN UP FOR ALERTS",
  "f1_account": "Have an account?",
  "f1_signin": "Sign in",
  "f1_area_line": "A meter number shows status for the area only. Search by address to check one home.",
  "f1_oot_t": "Outside SCE service area?",
  "f1_oot": "This address may be outside SCE’s service area. Check with your local power company.",
  "f1_none_t": "We couldn’t find that",
  "f1_none": "Check the spelling, or search by outage # or meter #.",
  "f1_trust": "Official SCE outage information",
  "f0m_filter": "Filter by status",
  "f0m_find": "Find an address",
  "f0m_find_aria": "Find one of your addresses",
  "f0m_opts": [
   "Active outage",
   "Potential shut off",
   "Likely shut off"
  ],
  "f7_sum_k": "Your addresses",
  "f7_need": "Needs attention",
  "f7_of": "of {n} addresses",
  "f7_sum_aria": "Summary of your addresses",
  "f7_filters": {
   "active": "Active",
   "planned": "Upcoming",
   "restored": "Restored",
   "on": "Service normal"
  },
  "f7_view": "View address",
  "f7_find": "Find an address",
  "f7_attn_first": "Needs attention first",
  "f7_by_addr": "By address",
  "f7_more": "More options",
  "f7_zip": "Group by ZIP code",
  "f7_page": "Show 6 at a time",
  "f7_empty": "No addresses match. Try another filter.",
  "f7_all": "See all your addresses",
  "f5_what": "What do you need to report?",
  "f5_addr": "Address",
  "f5_addr_hint": "We filled in the address you were viewing. You can pick another one.",
  "f5_whole": "No power in the whole home",
  "f5_part": "No power in part of my home",
  "f5_nb": "Are your neighbors out too?",
  "f5_hazard_d": "Something looks unsafe near a pole or equipment",
  "f5_nb_hint": "Report even if a neighbor already did. Every report helps us find the problem.",
  "f5_med": "Does anyone here need power for medical equipment? (optional)",
  "f5_med_why": "We ask so we know who may need extra help.",
  "f5_photo": "Add a photo",
  "f5_photo_hint": "Take it from where you are. Don’t go closer.",
  "f5_phone": "Phone number (so we can reach you)",
  "f5_phone_hint": "We’ll only use it about this report. No account needed.",
  "f5_privacy": "Privacy notice",
  "f5_send": "SEND REPORT",
  "f5_breaker_k": "Optional: check your breaker",
  "f5_breaker_hint": "If it’s safe, reset your breaker. If your power comes back, let us know.",
  "f5_breaker_note": "You still need to report this.",
  "f5_checks_aria": "Optional checks after you report",
  "f5_err_addr": "Enter the address where the problem is.",
  "f5_err_what": "Choose what you’re reporting.",
  "f5_err_phone": "Enter a 10-digit phone number, like (555) 555-0100.",
  "f5_report_hint": "This is a safety shutoff. You don’t need to report it.",
  "f5c_title": "We got your report",
  "f5c_title_dl": "We got your downed line report",
  "f5c_ref": "Report #",
  "f5c_power": "Power outage at ",
  "f5c_dl": "Downed power line at ",
  "f5c_hz": "Hazard at ",
  "f5c_view": "VIEW MY STATUS",
  "f5c_back": "BACK TO OUTAGE CENTER",
  "f5c_next": "What happens next",
  "f5c_next_dl": "We treat this as an emergency. A crew or SCE team member may call you. Keep everyone away until help arrives.",
  "f5c_next_hz": "SCE will review your report. We may contact you for more detail.",
  "f5c_next_pw": "Your report helps us find the cause.",
  "f5c_upd_t": "Get updates about this report",
  "f5c_text": "Text",
  "f5c_email": "Email",
  "f5c_mobile": "Mobile number",
  "f5c_consent": "By adding your number, you agree to texts from SCE about this outage. Msg &amp; data rates may apply. Reply STOP to stop.",
  "f5c_save": "SAVE",
  "f5c_signin": "Sign in to save to your account",
  "f5c_skip": "Skip",
  "f5c_chan_aria": "How to get updates",
  "f6_filter": "Map layers",
  "f6_expand": "Full-screen map",
  "f6_sw": "Show {l} areas",
  "f9_lead": "Stay safe. Save your backup power. Call 211 for local help.",
  "f9_mbl_t": "Medical Baseline program",
  "f9_mbl": "Do you use medical devices that need power? You may qualify for Medical Baseline. SCE tries extra ways to reach enrolled customers before a shutoff.",
  "f9_phone_report": "Report an outage or safety issue:",
  "f9_phone_cs": "Customer service:",
  "f9_phone_cs_val": "[number to be verified]",
  "f10_why": "Why a shutoff is likely",
  "f10_outlook": "Fire risk, next 7 days",
  "titles": {}
 },
 "status": {
  "normal": {
   "header": "ON",
   "label": "SERVICE NORMAL",
   "legend": "Service normal",
   "chip": "",
   "icon": "on"
  },
  "canceled": {
   "header": "ON",
   "label": "SERVICE NORMAL",
   "legend": "Service normal",
   "chip": "PSPS",
   "icon": "on"
  },
  "restored": {
   "header": "ON",
   "label": "POWER RESTORED",
   "legend": "Power restored",
   "chip": "",
   "icon": "on"
  },
  "restoring": {
   "header": "ON",
   "label": "POWER BACK FOR NOW",
   "legend": "Power back for now",
   "chip": "PSPS",
   "icon": "on"
  },
  "active": {
   "header": "OFF",
   "label": "ACTIVE OUTAGE",
   "legend": "Active outage",
   "chip": "Repair",
   "icon": "active"
  },
  "psps_active": {
   "header": "OFF",
   "label": "ACTIVE OUTAGE",
   "legend": "Active outage",
   "chip": "PSPS",
   "icon": "active"
  },
  "potential": {
   "header": "ON",
   "label": "POTENTIAL SHUT OFF",
   "legend": "Potential shut off",
   "chip": "PSPS",
   "icon": "potential"
  },
  "likely": {
   "header": "ON",
   "label": "LIKELY SHUT OFF",
   "legend": "Likely shut off",
   "chip": "PSPS",
   "icon": "likely"
  },
  "scheduled": {
   "header": "ON",
   "label": "SCHEDULED SHUT OFF",
   "legend": "Scheduled shut off",
   "chip": "PSPS",
   "icon": "scheduled"
  },
  "disconnected": {
   "header": "OFF",
   "label": "SERVICE DISCONNECTED",
   "legend": "Service disconnected",
   "chip": "",
   "icon": "disc"
  },
  "planned": {
   "header": "ON",
   "label": "PLANNED OUTAGE",
   "legend": "Planned outage",
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
 },
 "chip_types": [
  "Repair",
  "Planned",
  "PSPS"
 ],
 "scenario_chip": {
  "S1-active.html": [
   "Repair"
  ],
  "F2-active-detail.html": [
   "Repair"
  ],
  "N1-active-planned.html": [
   "Repair"
  ],
  "N2-active-planned-restored.html": [
   "Repair"
  ],
  "S3-no-outage.html": [
   ""
  ],
  "S12-weather.html": [
   ""
  ],
  "S13-disconnected.html": [
   ""
  ],
  "S6-psps-watch.html": [
   "PSPS"
  ],
  "S7-psps-active.html": [
   "PSPS"
  ],
  "S9-restored.html": [
   ""
  ],
  "P1-psps-shutoff.html": [
   "PSPS"
  ],
  "F0-signed.html": [
   "PSPS"
  ],
  "F0-multi.html": [
   "PSPS",
   "PSPS",
   "PSPS"
  ],
  "F10-psps-banner.html": [
   "PSPS"
  ],
  "P2-psps-restoring.html": [
   "PSPS"
  ],
  "P3-psps-canceled.html": [
   "PSPS"
  ],
  "S1-no-estimate.html": [
   "Repair"
  ]
 }
};
