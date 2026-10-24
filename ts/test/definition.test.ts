import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "audio",
    "accessor": "Audio",
    "op": "load",
    "method": "GET",
    "path": "/audio/{ref}",
    "args": [
      {
        "name": "id",
        "wire": "ref",
        "value": "2:5.1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "id": "1:2.5.1",
        "audio": {
          "tts-1-hd": {
            "nova": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 160,
              "duration": 18,
              "fileSize": 360960
            },
            "onyx": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 160,
              "duration": 18.4,
              "fileSize": 367680
            }
          },
          "gpt-4o-mini-tts": {
            "cedar": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 192,
              "duration": 18.1,
              "fileSize": 434511
            }
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "bible",
    "accessor": "Bible",
    "op": "create",
    "method": "POST",
    "path": "/bible/search/semantic",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "Matt.5.3",
          "reference": "Matthew 5:3",
          "bookCode": "Matt",
          "bookName": "Matthew",
          "canon": "nt",
          "chapter": 5,
          "verseStart": 3,
          "verseEnd": 3,
          "text": "“Blessed are the poor in spirit, for theirs is the Kingdom of Heaven.",
          "similarity": 0.840739,
          "urantiaParallels": [
            {
              "id": "4:140.3.3",
              "standardReferenceId": "140:3.3",
              "paperId": "140",
              "paperTitle": "The Ordination of the Twelve",
              "sectionTitle": "The Ordination Sermon",
              "text": "“Happy are the poor in spirit, the humble, for theirs are the treasures of the kingdom of heaven.",
              "similarity": 0.853767,
              "rank": 1
            }
          ]
        },
        {
          "id": "Ps.41.1",
          "reference": "Psalms 41:1",
          "bookCode": "Ps",
          "bookName": "Psalms",
          "canon": "ot",
          "chapter": 41,
          "verseStart": 1,
          "verseEnd": 1,
          "text": "Blessed is he who considers the poor. Yahweh will deliver him in the day of evil.",
          "similarity": 0.642851,
          "urantiaParallels": [
            {
              "id": "4:131.2.8",
              "standardReferenceId": "131:2.8",
              "paperId": "131",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Judaism",
              "text": "“Yahweh is the God of my salvation; therefore in the divine name will I put my trust. I will trust in the Lord with all my heart; I will lean not upon my own understanding. In all my ways I will acknowledge him, and he shall direct my paths. The Lord is faithful; he keeps his word with those who serve him; the just shall live by his faith. If you do not well, it is because sin lies at the door; men reap the evil they plough and the sin they sow. Fret not yourself because of evildoers. If you regard iniquity in your heart, the Lord will not hear you; if you sin against God, you also wrong your own soul. God will bring every man’s work to judgment with every secret thing, whether it be good or evil. As a man thinks in his heart, so is he.",
              "similarity": 0.512232,
              "rank": 1
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 17641,
        "totalPages": 8821
      }
    },
    "idField": "id"
  },
  {
    "entity": "bible",
    "accessor": "Bible",
    "op": "list",
    "method": "GET",
    "path": "/bible/books",
    "action": "book",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "bookCode": "Gen",
          "bookName": "Genesis",
          "fullName": "The First Book of Moses, Commonly Called Genesis",
          "abbr": "Gen",
          "bookOrder": 1,
          "canon": "ot",
          "chapterCount": 50,
          "verseCount": 1533
        },
        {
          "bookCode": "Exod",
          "bookName": "Exodus",
          "fullName": "The Second Book of Moses, Commonly Called Exodus",
          "abbr": "Exod",
          "bookOrder": 2,
          "canon": "ot",
          "chapterCount": 40,
          "verseCount": 1213
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "bible",
    "accessor": "Bible",
    "op": "load",
    "method": "GET",
    "path": "/bible/{bookCode}/{chapter}",
    "args": [
      {
        "name": "book_code",
        "wire": "bookCode",
        "value": "MAT"
      },
      {
        "name": "chapter",
        "wire": "chapter",
        "value": 5
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "bookCode": "Matt",
        "bookName": "Matthew",
        "canon": "nt",
        "chapter": 5,
        "verses": [
          {
            "id": "Matt.5.1",
            "reference": "Matthew 5:1",
            "bookCode": "Matt",
            "bookName": "Matthew",
            "bookOrder": 55,
            "canon": "nt",
            "chapter": 5,
            "verse": 1,
            "text": "Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him.",
            "translation": "web"
          },
          {
            "id": "Matt.5.2",
            "reference": "Matthew 5:2",
            "bookCode": "Matt",
            "bookName": "Matthew",
            "bookOrder": 55,
            "canon": "nt",
            "chapter": 5,
            "verse": 2,
            "text": "He opened his mouth and taught them, saying,",
            "translation": "web"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "bible",
    "accessor": "Bible",
    "op": "load",
    "method": "GET",
    "path": "/bible/{bookCode}",
    "args": [
      {
        "name": "id",
        "wire": "bookCode",
        "value": "MAT"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "bookCode": "Matt",
        "bookName": "Matthew",
        "fullName": "The Gospel According to Matthew",
        "abbr": "Matt",
        "bookOrder": 55,
        "canon": "nt",
        "chapterCount": 28,
        "verseCount": 1071
      }
    },
    "idField": "id"
  },
  {
    "entity": "citation",
    "accessor": "Citation",
    "op": "load",
    "method": "GET",
    "path": "/cite",
    "args": [],
    "select": {
      "ref": "2:5.1",
      "style": "apa"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "ref",
      "style"
    ],
    "queryArgs": [
      {
        "name": "ref",
        "wire": "ref"
      },
      {
        "name": "style",
        "wire": "style"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "ref": "2:5.1",
        "style": "apa",
        "citation": "The Urantia Book. (1955). Urantia Foundation. Paper 2, Section 5, Paragraph 1."
      }
    },
    "idField": "id"
  },
  {
    "entity": "embedding",
    "accessor": "Embedding",
    "op": "load",
    "method": "GET",
    "path": "/embeddings/{ref}",
    "args": [
      {
        "name": "id",
        "wire": "ref",
        "value": "2:5.1"
      }
    ],
    "select": {
      "model": "large"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "model"
    ],
    "queryArgs": [
      {
        "name": "model",
        "wire": "model"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "standardReferenceId": "x",
        "model": "x",
        "dimensions": 1,
        "embedding": [
          1
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "embedding",
    "accessor": "Embedding",
    "op": "load",
    "method": "GET",
    "path": "/embeddings/export",
    "action": "export",
    "args": [],
    "select": {
      "paper_id": "v1",
      "format": "jsonl",
      "model": "large"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "format",
      "paperId",
      "model"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "paper_id",
        "wire": "paperId"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "list",
    "method": "GET",
    "path": "/entities/{id}/paragraphs",
    "action": "paragraph",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "michael-of-nebadon"
      }
    ],
    "select": {
      "lang": "eng",
      "limit": 20,
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "limit",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "2:35.4.5",
          "standardReferenceId": "35:4.5",
          "sortId": "2.035.004.005",
          "paperId": "35",
          "sectionId": "4",
          "partId": "2",
          "paperTitle": "The Local Universe Sons of God",
          "sectionTitle": "Special Work of the Melchizedeks",
          "paragraphId": "5",
          "text": "The Melchizedek who lived on Urantia during the time of Abraham was locally known as Prince of Salem because he presided over a small colony of truth seekers residing at a place called Salem. He volunteered to incarnate in the likeness of mortal flesh and did so with the approval of the Melchizedek receivers of the planet, who feared that the light of life would become extinguished during that period of increasing spiritual darkness. And he did foster the truth of his day and safely pass it on to Abraham and his associates.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">The Melchizedek who lived on Urantia during the time of Abraham was locally known as Prince of Salem because he presided over a small colony of truth seekers residing at a place called Salem. He volunteered to incarnate in the likeness of mortal flesh and did so with the approval of the Melchizedek receivers of the planet, who feared that the light of life would become extinguished during that period of increasing spiritual darkness. And he did foster the truth of his day and safely pass it on to Abraham and his associates.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-2:35.4.5.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 33.3,
                "fileSize": 666240
              }
            },
            "gpt-4o-mini-tts": {
              "cedar": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-2:35.4.5.mp3",
                "format": "mp3",
                "bitrate": 192,
                "duration": 32.5,
                "fileSize": 781835
              }
            }
          }
        },
        {
          "id": "2:43.5.17",
          "standardReferenceId": "43:5.17",
          "sortId": "2.043.005.017",
          "paperId": "43",
          "sectionId": "5",
          "partId": "2",
          "paperTitle": "The Constellations",
          "sectionTitle": "The Edentia Fathers since the Lucifer Rebellion",
          "paragraphId": "17",
          "text": "Every quarantined or isolated world has a Vorondadek Son acting as an observer. He does not participate in planetary administration except when ordered by the Constellation Father to intervene in the affairs of the nations. Actually it is this Most High observer who “rules in the kingdoms of men.” Urantia is one of the isolated worlds of Norlatiadek, and a Vorondadek observer has been stationed on the planet ever since the Caligastia betrayal. When Machiventa Melchizedek ministered in semimaterial form on Urantia, he paid respectful homage to the Most High observer then on duty, as it is written, “And Melchizedek, king of Salem, was the priest of the Most High.” Melchizedek revealed the relations of this Most High observer to Abraham when he said, “And blessed be the Most High, who has delivered your enemies into your hand.”",
          "htmlText": "<span class=\"urantia-dev-pb-0\">Every quarantined or isolated world has a Vorondadek Son acting as an observer. He does not participate in planetary administration except when ordered by the Constellation Father to intervene in the affairs of the nations. Actually it is this Most High observer who “rules in the kingdoms of men.” Urantia is one of the isolated worlds of Norlatiadek, and a Vorondadek observer has been stationed on the planet ever since the Caligastia betrayal. When Machiventa Melchizedek ministered in semimaterial form on Urantia, he paid respectful homage to the Most High observer then on duty, as it is written, “And Melchizedek, king of Salem, was the priest of the Most High.” Melchizedek revealed the relations of this Most High observer to Abraham when he said, “And blessed be the Most High, who has delivered your enemies into your hand.”</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-2:43.5.17.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 52.1,
                "fileSize": 1042560
              }
            }
          }
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 67,
        "totalPages": 34
      }
    },
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "list",
    "method": "GET",
    "path": "/entities",
    "args": [],
    "select": {
      "lang": "eng",
      "limit": 20,
      "page": 0,
      "q": "v1",
      "type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "limit",
      "type",
      "q",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "father-melchizedek",
          "name": "Father Melchizedek",
          "type": "being",
          "aliases": null,
          "description": "The original and firstborn Melchizedek Son of Nebadon, created through the union of the Creator Son and Creative Spirit, who serves as Gabriel's executive associate and assumes his responsibilities during his absence from Salvington.",
          "seeAlso": [
            "Melchizedek Sons"
          ],
          "citationCount": 13
        },
        {
          "id": "machiventa-melchizedek",
          "name": "Machiventa Melchizedek",
          "type": "being",
          "aliases": [
            "Machiventa Melchizedek",
            "Melchizedek"
          ],
          "description": "A Melchizedek Son who incarnated as an emergency bestowal on Urantia in 1973 B.C., appearing at Salem to preserve the truth of one God and prepare the way for Michael's later bestowal. Known as the Prince of Salem, he taught Abraham and established a covenant based on faith rather than sacrifice, departing after 94 years when his followers began to regard him as supernatural. He now serves as vicegerent Planetary Prince of Urantia.",
          "seeAlso": [
            "Melchizedek Sons",
            "missionaries:Salem missionaries"
          ],
          "citationCount": 55
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 14,
        "totalPages": 7
      }
    },
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "load",
    "method": "GET",
    "path": "/entities/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "michael-of-nebadon"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "id": "machiventa-melchizedek",
        "name": "Machiventa Melchizedek",
        "type": "being",
        "aliases": [
          "Machiventa Melchizedek",
          "Melchizedek"
        ],
        "description": "A Melchizedek Son who incarnated as an emergency bestowal on Urantia in 1973 B.C., appearing at Salem to preserve the truth of one God and prepare the way for Michael's later bestowal. Known as the Prince of Salem, he taught Abraham and established a covenant based on faith rather than sacrifice, departing after 94 years when his followers began to regard him as supernatural. He now serves as vicegerent Planetary Prince of Urantia.",
        "seeAlso": [
          "Melchizedek Sons",
          "missionaries:Salem missionaries"
        ],
        "citationCount": 55
      }
    },
    "idField": "id"
  },
  {
    "entity": "feedback",
    "accessor": "Feedback",
    "op": "create",
    "method": "POST",
    "path": "/feedback",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "data": {
        "id": "x",
        "receivedAt": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "language",
    "accessor": "Language",
    "op": "list",
    "method": "GET",
    "path": "/languages",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "code": "eng",
          "name": "English",
          "entityCount": 0,
          "paragraphCount": 0
        },
        {
          "code": "es",
          "name": "Spanish",
          "entityCount": 4456,
          "paragraphCount": 0
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "ogn",
    "accessor": "Ogn",
    "op": "load",
    "method": "GET",
    "path": "/og/{ref}",
    "args": [
      {
        "name": "ref",
        "wire": "ref",
        "value": "2:5.1"
      }
    ],
    "select": {
      "theme": "default"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "theme"
    ],
    "queryArgs": [
      {
        "name": "theme",
        "wire": "theme"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "list",
    "method": "GET",
    "path": "/papers/{id}/sections",
    "action": "section",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "1"
      }
    ],
    "select": {
      "lang": "eng"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "lang"
    ],
    "queryArgs": [
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "2.0",
          "paperId": "2",
          "sectionId": "0",
          "title": null,
          "globalId": "1:2.0.-",
          "sortId": "1.002.000.000"
        },
        {
          "id": "2.1",
          "paperId": "2",
          "sectionId": "1",
          "title": "The Infinity of God",
          "globalId": "1:2.1.-",
          "sortId": "1.002.001.000"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "list",
    "method": "GET",
    "path": "/papers",
    "args": [],
    "select": {
      "format": "default",
      "include": "v1",
      "lang": "eng"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include",
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "0",
          "partId": "0",
          "title": "Foreword",
          "sortId": "0.000.000.000",
          "labels": [
            "Theology",
            "Cosmology"
          ],
          "video": {
            "nova": {
              "mp4": "https://video.urantiahub.com/tts-1-hd-nova-0.mp4",
              "thumbnail": "https://video.urantiahub.com/thumbnail-0.png",
              "duration": 3262
            }
          }
        },
        {
          "id": "1",
          "partId": "1",
          "title": "The Universal Father",
          "sortId": "1.001.000.000",
          "labels": [
            "Spirituality",
            "Theology"
          ],
          "video": {
            "nova": {
              "mp4": "https://video.urantiahub.com/tts-1-hd-nova-1.mp4",
              "thumbnail": "https://video.urantiahub.com/thumbnail-1.png",
              "duration": 2336
            }
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "load",
    "method": "GET",
    "path": "/papers/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "1"
      }
    ],
    "select": {
      "format": "default",
      "include": "v1",
      "lang": "eng"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include",
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "paper": {
          "id": "2",
          "partId": "1",
          "title": "The Nature of God",
          "sortId": "1.002.000.000",
          "labels": [
            "Spirituality",
            "Theology"
          ],
          "video": {
            "nova": {
              "mp4": "https://video.urantiahub.com/tts-1-hd-nova-2.mp4",
              "thumbnail": "https://video.urantiahub.com/thumbnail-2.png",
              "duration": 2324
            }
          },
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/papers/2.mp3",
                "format": "mp3",
                "starts": [
                  {
                    "at": 0,
                    "key": "title"
                  },
                  {
                    "at": 3.53,
                    "key": "2:0.1",
                    "sentences": [
                      3.53,
                      21.34
                    ]
                  }
                ],
                "bitrate": 32,
                "duration": 2340.84
              }
            }
          }
        },
        "paragraphs": [
          {
            "id": "1:2.0.1",
            "standardReferenceId": "2:0.1",
            "sortId": "1.002.000.001",
            "paperId": "2",
            "sectionId": "0",
            "partId": "1",
            "paperTitle": "The Nature of God",
            "sectionTitle": null,
            "paragraphId": "1",
            "text": "INASMUCH as man’s highest possible concept of God is embraced within the human idea and ideal of a primal and infinite personality, it is permissible, and may prove helpful, to study certain characteristics of the divine nature which constitute the character of Deity. The nature of God can best be understood by the revelation of the Father which Michael of Nebadon unfolded in his manifold teachings and in his superb mortal life in the flesh. The divine nature can also be better understood by man if he regards himself as a child of God and looks up to the Paradise Creator as a true spiritual Father.",
            "htmlText": "<span class=\"urantia-dev-pb-0\">INASMUCH as man’s highest possible concept of God is embraced within the human idea and ideal of a primal and infinite personality, it is permissible, and may prove helpful, to study certain characteristics of the divine nature which constitute the character of Deity. The nature of God can best be understood by the revelation of the Father which Michael of Nebadon unfolded in his manifold teachings and in his superb mortal life in the flesh. The divine nature can also be better understood by man if he regards himself as a child of God and looks up to the Paradise Creator as a true spiritual Father.</span>",
            "labels": [],
            "audio": {
              "tts-1-hd": {
                "nova": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.0.1.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 38.1,
                  "fileSize": 762240
                },
                "onyx": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.0.1.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 37.9,
                  "fileSize": 757440
                }
              },
              "gpt-4o-mini-tts": {
                "cedar": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.0.1.mp3",
                  "format": "mp3",
                  "bitrate": 192,
                  "duration": 38.8,
                  "fileSize": 931674
                }
              }
            }
          },
          {
            "id": "1:2.0.2",
            "standardReferenceId": "2:0.2",
            "sortId": "1.002.000.002",
            "paperId": "2",
            "sectionId": "0",
            "partId": "1",
            "paperTitle": "The Nature of God",
            "sectionTitle": null,
            "paragraphId": "2",
            "text": "The nature of God can be studied in a revelation of supreme ideas, the divine character can be envisaged as a portrayal of supernal ideals, but the most enlightening and spiritually edifying of all revelations of the divine nature is to be found in the comprehension of the religious life of Jesus of Nazareth, both before and after his attainment of full consciousness of divinity. If the incarnated life of Michael is taken as the background of the revelation of God to man, we may attempt to put in human word symbols certain ideas and ideals concerning the divine nature which may possibly contribute to a further illumination and unification of the human concept of the nature and the character of the personality of the Universal Father.",
            "htmlText": "<span class=\"urantia-dev-pb-0\">The nature of God can be studied in a revelation of supreme ideas, the divine character can be envisaged as a portrayal of supernal ideals, but the most enlightening and spiritually edifying of all revelations of the divine nature is to be found in the comprehension of the religious life of Jesus of Nazareth, both before and after his attainment of full consciousness of divinity. If the incarnated life of Michael is taken as the background of the revelation of God to man, we may attempt to put in human word symbols certain ideas and ideals concerning the divine nature which may possibly contribute to a further illumination and unification of the human concept of the nature and the character of the personality of the Universal Father.</span>",
            "labels": [],
            "audio": {
              "tts-1-hd": {
                "nova": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.0.2.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 45.9,
                  "fileSize": 918240
                },
                "onyx": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.0.2.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 46.2,
                  "fileSize": 924480
                }
              },
              "gpt-4o-mini-tts": {
                "cedar": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.0.2.mp3",
                  "format": "mp3",
                  "bitrate": 192,
                  "duration": 45,
                  "fileSize": 1080258
                }
              }
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "paragraph",
    "accessor": "Paragraph",
    "op": "load",
    "method": "GET",
    "path": "/paragraphs/{ref}",
    "args": [
      {
        "name": "id",
        "wire": "ref",
        "value": "2:5.1"
      }
    ],
    "select": {
      "format": "default",
      "include": "v1",
      "lang": "eng"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include",
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "id": "1:2.5.1",
        "standardReferenceId": "2:5.1",
        "sortId": "1.002.005.001",
        "paperId": "2",
        "sectionId": "5",
        "partId": "1",
        "paperTitle": "The Nature of God",
        "sectionTitle": "The Love of God",
        "paragraphId": "1",
        "text": "“God is love”; therefore his only personal attitude towards the affairs of the universe is always a reaction of divine affection. The Father loves us sufficiently to bestow his life upon us. “He makes his sun to rise on the evil and on the good and sends rain on the just and on the unjust.”",
        "htmlText": "<span class=\"urantia-dev-pb-4\">“God is love”; therefore his only personal attitude towards the affairs of the universe is always a reaction of divine affection. The Father loves us sufficiently to bestow his life upon us. “He makes his sun to rise on the evil and on the good and sends rain on the just and on the unjust.”</span>",
        "labels": [],
        "audio": {
          "tts-1-hd": {
            "nova": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 160,
              "duration": 18,
              "fileSize": 360960
            },
            "onyx": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 160,
              "duration": 18.4,
              "fileSize": 367680
            }
          },
          "gpt-4o-mini-tts": {
            "cedar": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.5.1.mp3",
              "format": "mp3",
              "bitrate": 192,
              "duration": 18.1,
              "fileSize": 434511
            }
          }
        }
      },
      "navigation": {
        "prev": "2:4.5",
        "next": "2:5.2"
      }
    },
    "idField": "id"
  },
  {
    "entity": "paragraph",
    "accessor": "Paragraph",
    "op": "load",
    "method": "GET",
    "path": "/paragraphs/{ref}/context",
    "action": "context",
    "args": [
      {
        "name": "ref",
        "wire": "ref",
        "value": "2:5.1"
      }
    ],
    "select": {
      "format": "default",
      "include": "v1",
      "lang": "eng",
      "window": 2
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "window",
      "include",
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "window",
        "wire": "window"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "target": {
          "id": "1:2.5.10",
          "standardReferenceId": "2:5.10",
          "sortId": "1.002.005.010",
          "paperId": "2",
          "sectionId": "5",
          "partId": "1",
          "paperTitle": "The Nature of God",
          "sectionTitle": "The Love of God",
          "paragraphId": "10",
          "text": "But the love of God is an intelligent and farseeing parental affection. The divine love functions in unified association with divine wisdom and all other infinite characteristics of the perfect nature of the Universal Father. God is love, but love is not God. The greatest manifestation of the divine love for mortal beings is observed in the bestowal of the Thought Adjusters, but your greatest revelation of the Father’s love is seen in the bestowal life of his Son Michael as he lived on earth the ideal spiritual life. It is the indwelling Adjuster who individualizes the love of God to each human soul.",
          "htmlText": "<span class=\"urantia-dev-pb-4\">But the love of God is an intelligent and farseeing parental affection. The divine love functions in unified association with divine wisdom and all other infinite characteristics of the perfect nature of the Universal Father. God is love, but love is not God. The greatest manifestation of the divine love for mortal beings is observed in the bestowal of the Thought Adjusters, but your greatest revelation of the Father’s love is seen in the bestowal life of his Son Michael as he lived on earth the ideal spiritual life. It is the indwelling Adjuster who individualizes the love of God to each human soul.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.5.10.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 38.1,
                "fileSize": 761760
              },
              "onyx": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.5.10.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 37.8,
                "fileSize": 756480
              }
            },
            "gpt-4o-mini-tts": {
              "cedar": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.5.10.mp3",
                "format": "mp3",
                "bitrate": 192,
                "duration": 36.4,
                "fileSize": 873995
              }
            }
          }
        },
        "before": [
          {
            "id": "1:2.5.9",
            "standardReferenceId": "2:5.9",
            "sortId": "1.002.005.009",
            "paperId": "2",
            "sectionId": "5",
            "partId": "1",
            "paperTitle": "The Nature of God",
            "sectionTitle": "The Love of God",
            "paragraphId": "9",
            "text": "The Father’s love follows us now and throughout the endless circle of the eternal ages. As you ponder the loving nature of God, there is only one reasonable and natural personality reaction thereto: You will increasingly love your Maker; you will yield to God an affection analogous to that given by a child to an earthly parent; for, as a father, a real father, a true father, loves his children, so the Universal Father loves and forever seeks the welfare of his created sons and daughters.",
            "htmlText": "<span class=\"urantia-dev-pb-0\">The Father’s love follows us now and throughout the endless circle of the eternal ages. As you ponder the loving nature of God, there is only one reasonable and natural personality reaction thereto: You will increasingly love your Maker; you will yield to God an affection analogous to that given by a child to an earthly parent; for, as a father, a real father, a true father, loves his children, so the Universal Father loves and forever seeks the welfare of his created sons and daughters.</span>",
            "labels": [],
            "audio": {
              "tts-1-hd": {
                "nova": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.5.9.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 30.5,
                  "fileSize": 609600
                },
                "onyx": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.5.9.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 30.7,
                  "fileSize": 613440
                }
              },
              "gpt-4o-mini-tts": {
                "cedar": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.5.9.mp3",
                  "format": "mp3",
                  "bitrate": 192,
                  "duration": 32.4,
                  "fileSize": 779328
                }
              }
            }
          }
        ],
        "after": [
          {
            "id": "1:2.5.11",
            "standardReferenceId": "2:5.11",
            "sortId": "1.002.005.011",
            "paperId": "2",
            "sectionId": "5",
            "partId": "1",
            "paperTitle": "The Nature of God",
            "sectionTitle": "The Love of God",
            "paragraphId": "11",
            "text": "At times I am almost pained to be compelled to portray the divine affection of the heavenly Father for his universe children by the employment of the human word symbol love. This term, even though it does connote man’s highest concept of the mortal relations of respect and devotion, is so frequently designative of so much of human relationship that is wholly ignoble and utterly unfit to be known by any word which is also used to indicate the matchless affection of the living God for his universe creatures! How unfortunate that I cannot make use of some supernal and exclusive term which would convey to the mind of man the true nature and exquisitely beautiful significance of the divine affection of the Paradise Father.",
            "htmlText": "<span class=\"urantia-dev-pb-4\">At times I am almost pained to be compelled to portray the divine affection of the heavenly Father for his universe children by the employment of the human word symbol <em>love.</em> This term, even though it does connote man’s highest concept of the mortal relations of respect and devotion, is so frequently designative of so much of human relationship that is wholly ignoble and utterly unfit to be known by any word which is also used to indicate the matchless affection of the living God for his universe creatures! How unfortunate that I cannot make use of some supernal and exclusive term which would convey to the mind of man the true nature and exquisitely beautiful significance of the divine affection of the Paradise Father.</span>",
            "labels": [],
            "audio": {
              "tts-1-hd": {
                "nova": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:2.5.11.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 45.9,
                  "fileSize": 918240
                },
                "onyx": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/onyx/tts-1-hd-onyx-1:2.5.11.mp3",
                  "format": "mp3",
                  "bitrate": 160,
                  "duration": 45.6,
                  "fileSize": 912480
                }
              },
              "gpt-4o-mini-tts": {
                "cedar": {
                  "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:2.5.11.mp3",
                  "format": "mp3",
                  "bitrate": 192,
                  "duration": 42.7,
                  "fileSize": 1025088
                }
              }
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "paragraph",
    "accessor": "Paragraph",
    "op": "load",
    "method": "GET",
    "path": "/paragraphs/random",
    "action": "random",
    "args": [],
    "select": {
      "format": "default",
      "include": "v1",
      "lang": "eng",
      "max_length": "v1",
      "min_length": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include",
      "format",
      "lang",
      "minLength",
      "maxLength"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "max_length",
        "wire": "maxLength"
      },
      {
        "name": "min_length",
        "wire": "minLength"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "id": "1:10.0.2",
        "standardReferenceId": "10:0.2",
        "sortId": "1.010.000.002",
        "paperId": "10",
        "sectionId": "0",
        "partId": "1",
        "paperTitle": "The Paradise Trinity",
        "sectionTitle": null,
        "paragraphId": "2",
        "text": "The Paradise Trinity effectively provides for the full expression and perfect revelation of the eternal nature of Deity. The Stationary Sons of the Trinity likewise afford a full and perfect revelation of divine justice. The Trinity is Deity unity, and this unity rests eternally upon the absolute foundations of the divine oneness of the three original and co-ordinate and coexistent personalities, God the Father, God the Son, and God the Spirit.",
        "htmlText": "<span class=\"urantia-dev-pb-4\">The Paradise Trinity effectively provides for the full expression and perfect revelation of the eternal nature of Deity. The Stationary Sons of the Trinity likewise afford a full and perfect revelation of divine justice. The Trinity is Deity unity, and this unity rests eternally upon the absolute foundations of the divine oneness of the three original and co-ordinate and coexistent personalities, God the Father, God the Son, and God the Spirit.</span>",
        "labels": [],
        "audio": {
          "tts-1-hd": {
            "nova": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-1:10.0.2.mp3",
              "format": "mp3",
              "bitrate": 160,
              "duration": 27.5,
              "fileSize": 550560
            }
          },
          "gpt-4o-mini-tts": {
            "cedar": {
              "url": "https://cdn.urantia.dev/audio/eng/paragraphs/cedar/gpt-4o-mini-tts-cedar-1:10.0.2.mp3",
              "format": "mp3",
              "bitrate": 192,
              "duration": 28.6,
              "fileSize": 687794
            }
          }
        }
      },
      "navigation": {
        "prev": "10:0.1",
        "next": "10:0.3"
      }
    },
    "idField": "id"
  },
  {
    "entity": "quote",
    "accessor": "Quote",
    "op": "create",
    "method": "POST",
    "path": "/quotes/verify",
    "action": "verify",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "verdict": "close",
        "match": {
          "reference": "2:5.1",
          "paperId": "2",
          "paperTitle": "The Nature of God",
          "sectionTitle": "The Love of God",
          "verdict": "close",
          "similarity": 0.909,
          "text": "The Father loves us sufficiently to bestow his life upon us",
          "differences": [
            {
              "quote": "enough",
              "text": "sufficiently"
            }
          ]
        },
        "claimedReference": {
          "ref": "2:5.1",
          "exists": true,
          "verdict": "close"
        },
        "alsoFoundAt": []
      }
    },
    "idField": "id"
  },
  {
    "entity": "scripture",
    "accessor": "Scripture",
    "op": "create",
    "method": "POST",
    "path": "/scriptures/search/semantic",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "chunkId": "dhammapada-muller-1881:Dhp 3",
          "reference": "Dhp 3-5",
          "corpus": {
            "id": "dhammapada-muller-1881",
            "slug": "dhammapada",
            "religion": "Buddhist",
            "title": "The Dhammapada",
            "translator": "F. Max Muller",
            "year": 1881,
            "refPrefix": "Dhp",
            "urantiaSection": "131:3"
          },
          "text": "\"He abused me, he beat me, he defeated me, he robbed me,\"--in those who harbour such thoughts hatred will never cease. \"He abused me, he beat me, he defeated me, he robbed me,\"--in those who do not harbour such thoughts hatred will cease. For hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule.",
          "similarity": 0.599195,
          "urantiaParallels": [
            {
              "id": "4:131.3.6",
              "standardReferenceId": "131:3.6",
              "paperId": "131",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“The fool has said in his heart, ‘Evil shall not overtake me’; but safety is found only when the soul craves reproof and the mind seeks wisdom. The wise man is a noble soul who is friendly in the midst of his enemies, tranquil among the turbulent, and generous among the grasping. Love of self is like weeds in a goodly field. Selfishness leads to grief; perpetual care kills. The tamed mind yields happiness. He is the greatest of warriors who overcomes and subdues himself. Restraint in all things is good. He alone is a superior person who esteems virtue and is observant of his duty. Let not anger and hate master you. Speak harshly of no one. Contentment is the greatest wealth. What is given wisely is well saved. Do not to others those things you would not wish done to you. Pay good for evil; overcome evil with the good.",
              "similarity": 0.412424,
              "rank": 1
            }
          ]
        },
        {
          "chunkId": "dhammapada-muller-1881:Dhp 211",
          "reference": "Dhp 211-213",
          "corpus": {
            "id": "dhammapada-muller-1881",
            "slug": "dhammapada",
            "religion": "Buddhist",
            "title": "The Dhammapada",
            "translator": "F. Max Muller",
            "year": 1881,
            "refPrefix": "Dhp",
            "urantiaSection": "131:3"
          },
          "text": "Let, therefore, no man love anything; loss of the beloved is evil. Those who love nothing and hate nothing, have no fetters. From pleasure comes grief, from pleasure comes fear; he who is free from pleasure knows neither grief nor fear. From affection comes grief, from affection comes fear; he who is free from affection knows neither grief nor fear.",
          "similarity": 0.441808,
          "urantiaParallels": [
            {
              "id": "4:131.3.6",
              "standardReferenceId": "131:3.6",
              "paperId": "131",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“The fool has said in his heart, ‘Evil shall not overtake me’; but safety is found only when the soul craves reproof and the mind seeks wisdom. The wise man is a noble soul who is friendly in the midst of his enemies, tranquil among the turbulent, and generous among the grasping. Love of self is like weeds in a goodly field. Selfishness leads to grief; perpetual care kills. The tamed mind yields happiness. He is the greatest of warriors who overcomes and subdues himself. Restraint in all things is good. He alone is a superior person who esteems virtue and is observant of his duty. Let not anger and hate master you. Speak harshly of no one. Contentment is the greatest wealth. What is given wisely is well saved. Do not to others those things you would not wish done to you. Pay good for evil; overcome evil with the good.",
              "similarity": 0.475247,
              "rank": 1
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 14624,
        "totalPages": 7312
      }
    },
    "idField": "id"
  },
  {
    "entity": "scripture",
    "accessor": "Scripture",
    "op": "load",
    "method": "GET",
    "path": "/scriptures/{corpus}",
    "args": [
      {
        "name": "id",
        "wire": "corpus",
        "value": "bhagavad-gita"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "id": "bhagavad-gita-besant-1922",
        "slug": "bhagavad-gita",
        "religion": "Hindu",
        "title": "The Bhagavad Gita",
        "translator": "Annie Besant (4th edition)",
        "year": 1922,
        "refPrefix": "BG",
        "urantiaSection": "131:4",
        "sourceUrl": "https://en.wikisource.org/wiki/Bhagavad-Gita_(Besant_4th)",
        "license": "Public domain in the United States",
        "divisionLabel": "chapter",
        "unitLabel": "verse",
        "passageCount": 701,
        "refLevels": 2,
        "notes": null,
        "divisions": [
          {
            "division": 1,
            "title": null,
            "firstRef": "BG 1.1",
            "lastRef": "BG 1.47",
            "passageCount": 47
          },
          {
            "division": 2,
            "title": null,
            "firstRef": "BG 2.1",
            "lastRef": "BG 2.72",
            "passageCount": 72
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "create",
    "method": "POST",
    "path": "/search",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "3:108.5.5",
          "standardReferenceId": "108:5.5",
          "sortId": "3.108.005.005",
          "paperId": "108",
          "sectionId": "5",
          "partId": "3",
          "paperTitle": "Mission and Ministry of Thought Adjusters",
          "sectionTitle": "The Adjuster’s Mission",
          "paragraphId": "5",
          "text": "The Mystery Monitors are not thought helpers; they are thought adjusters. They labor with the material mind for the purpose of constructing, by adjustment and spiritualization, a new mind for the new worlds and the new name of your future career. Their mission chiefly concerns the future life, not this life. They are called heavenly helpers, not earthly helpers. They are not interested in making the mortal career easy; rather are they concerned in making your life reasonably difficult and rugged, so that decisions will be stimulated and multiplied. The presence of a great Thought Adjuster does not bestow ease of living and freedom from strenuous thinking, but such a divine gift should confer a sublime peace of mind and a superb tranquillity of spirit.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">The Mystery Monitors are not <span class=urantia-dev-highlighted>thought</span> helpers; they are <span class=urantia-dev-highlighted>thought</span> <span class=urantia-dev-highlighted>adjusters</span>. They labor with the material mind for the purpose of constructing, by <span class=urantia-dev-highlighted>adjustment</span> and spiritualization, a new mind for the new worlds and the new name of your future career. Their mission chiefly concerns the future life, not this life. They are called heavenly helpers, not earthly helpers. They are not interested in making the mortal career easy; rather are they concerned in making your life reasonably difficult and rugged, so that decisions will be stimulated and multiplied. The presence of a great <span class=urantia-dev-highlighted>Thought</span> <span class=urantia-dev-highlighted>Adjuster</span> does not bestow ease of living and freedom from strenuous thinking, but such a divine gift should confer a sublime peace of mind and a superb tranquillity of spirit.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:108.5.5.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 47.4,
                "fileSize": 948000
              }
            }
          },
          "rank": 0.0827456,
          "match": "exact"
        },
        {
          "id": "3:110.5.5",
          "standardReferenceId": "110:5.5",
          "sortId": "3.110.005.005",
          "paperId": "110",
          "sectionId": "5",
          "partId": "3",
          "paperTitle": "Relation of Adjusters to Individual Mortals",
          "sectionTitle": "Erroneous Concepts of Adjuster Guidance",
          "paragraphId": "5",
          "text": "It is extremely dangerous to postulate as to the Adjuster content of the dream life. The Adjusters do work during sleep, but your ordinary dream experiences are purely physiologic and psychologic phenomena. Likewise, it is hazardous to attempt the differentiation of the Adjusters’ concept registry from the more or less continuous and conscious reception of the dictations of mortal conscience. These are problems which will have to be solved through individual discrimination and personal decision. But a human being would do better to err in rejecting an Adjuster’s expression through believing it to be a purely human experience than to blunder into exalting a reaction of the mortal mind to the sphere of divine dignity. Remember, the influence of a Thought Adjuster is for the most part, though not wholly, a superconscious experience.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">It is extremely dangerous to postulate as to the <span class=urantia-dev-highlighted>Adjuster</span> content of the dream life. The <span class=urantia-dev-highlighted>Adjusters</span> do work during sleep, but your ordinary dream experiences are purely physiologic and psychologic phenomena. Likewise, it is hazardous to attempt the differentiation of the <span class=urantia-dev-highlighted>Adjusters</span>’ concept registry from the more or less continuous and conscious reception of the dictations of mortal conscience. These are problems which will have to be solved through individual discrimination and personal decision. But a human being would do better to err in rejecting an <span class=urantia-dev-highlighted>Adjuster</span>’s expression through believing it to be a purely human experience than to blunder into exalting a reaction of the mortal mind to the sphere of divine dignity. Remember, the influence of a <span class=urantia-dev-highlighted>Thought</span> <span class=urantia-dev-highlighted>Adjuster</span> is for the most part, though not wholly, a superconscious experience.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:110.5.5.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 52.1,
                "fileSize": 1042560
              }
            }
          },
          "rank": 0.0748848,
          "match": "exact"
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 244,
        "totalPages": 122
      }
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "create",
    "method": "POST",
    "path": "/search/semantic",
    "action": "semantic",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "3:112.4.3",
          "standardReferenceId": "112:4.3",
          "sortId": "3.112.004.003",
          "paperId": "112",
          "sectionId": "4",
          "partId": "3",
          "paperTitle": "Personality Survival",
          "sectionTitle": "Adjusters After Death",
          "paragraphId": "3",
          "text": "Subsequent to physical death, except in individuals translated from among the living, the released Adjuster goes immediately to the home sphere of Divinington. The details of what transpires on that world during the time of awaiting the factual reappearance of the surviving mortal depend chiefly on whether the human being ascends to the mansion worlds in his own individual right or awaits a dispensational summoning of the sleeping survivors of a planetary age.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">Subsequent to physical death, except in individuals translated from among the living, the released Adjuster goes immediately to the home sphere of Divinington. The details of what transpires on that world during the time of awaiting the factual reappearance of the surviving mortal depend chiefly on whether the human being ascends to the mansion worlds in his own individual right or awaits a dispensational summoning of the sleeping survivors of a planetary age.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:112.4.3.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 29,
                "fileSize": 579360
              }
            }
          },
          "similarity": 0.553150798189724,
          "strength": "weak",
          "match": "similar"
        },
        {
          "id": "3:112.3.4",
          "standardReferenceId": "112:3.4",
          "sortId": "3.112.003.004",
          "paperId": "112",
          "sectionId": "3",
          "partId": "3",
          "paperTitle": "Personality Survival",
          "sectionTitle": "The Phenomenon of Death",
          "paragraphId": "4",
          "text": "3. Physical (body and mind) death. When death overtakes a human being, the Adjuster remains in the citadel of the mind until it ceases to function as an intelligent mechanism, about the time that the measurable brain energies cease their rhythmic vital pulsations. Following this dissolution the Adjuster takes leave of the vanishing mind, just as unceremoniously as entry was made years before, and proceeds to Divinington by way of Uversa.",
          "htmlText": "<span class=\"urantia-dev-pb-2\">3. <em>Physical (body and mind) death.</em> When death overtakes a human being, the Adjuster remains in the citadel of the mind until it ceases to function as an intelligent mechanism, about the time that the measurable brain energies cease their rhythmic vital pulsations. Following this dissolution the Adjuster takes leave of the vanishing mind, just as unceremoniously as entry was made years before, and proceeds to Divinington by way of Uversa.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:112.3.4.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 27.4,
                "fileSize": 547680
              }
            }
          },
          "similarity": 0.526940972060405,
          "strength": "weak",
          "match": "similar"
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 100,
        "totalPages": 50,
        "related": 0
      }
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search",
    "args": [],
    "select": {
      "q": "love",
      "include": "v1",
      "limit": 20,
      "page": 0,
      "paper_id": "2",
      "part_id": "v1",
      "type": "auto"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "page",
      "limit",
      "paperId",
      "partId",
      "type",
      "include"
    ],
    "queryArgs": [
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "paper_id",
        "wire": "paperId"
      },
      {
        "name": "part_id",
        "wire": "partId"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "3:108.5.5",
          "standardReferenceId": "108:5.5",
          "sortId": "3.108.005.005",
          "paperId": "108",
          "sectionId": "5",
          "partId": "3",
          "paperTitle": "Mission and Ministry of Thought Adjusters",
          "sectionTitle": "The Adjuster’s Mission",
          "paragraphId": "5",
          "text": "The Mystery Monitors are not thought helpers; they are thought adjusters. They labor with the material mind for the purpose of constructing, by adjustment and spiritualization, a new mind for the new worlds and the new name of your future career. Their mission chiefly concerns the future life, not this life. They are called heavenly helpers, not earthly helpers. They are not interested in making the mortal career easy; rather are they concerned in making your life reasonably difficult and rugged, so that decisions will be stimulated and multiplied. The presence of a great Thought Adjuster does not bestow ease of living and freedom from strenuous thinking, but such a divine gift should confer a sublime peace of mind and a superb tranquillity of spirit.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">The Mystery Monitors are not <span class=urantia-dev-highlighted>thought</span> helpers; they are <span class=urantia-dev-highlighted>thought</span> <span class=urantia-dev-highlighted>adjusters</span>. They labor with the material mind for the purpose of constructing, by <span class=urantia-dev-highlighted>adjustment</span> and spiritualization, a new mind for the new worlds and the new name of your future career. Their mission chiefly concerns the future life, not this life. They are called heavenly helpers, not earthly helpers. They are not interested in making the mortal career easy; rather are they concerned in making your life reasonably difficult and rugged, so that decisions will be stimulated and multiplied. The presence of a great <span class=urantia-dev-highlighted>Thought</span> <span class=urantia-dev-highlighted>Adjuster</span> does not bestow ease of living and freedom from strenuous thinking, but such a divine gift should confer a sublime peace of mind and a superb tranquillity of spirit.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:108.5.5.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 47.4,
                "fileSize": 948000
              }
            }
          },
          "rank": 0.0827456,
          "match": "exact"
        },
        {
          "id": "3:110.5.5",
          "standardReferenceId": "110:5.5",
          "sortId": "3.110.005.005",
          "paperId": "110",
          "sectionId": "5",
          "partId": "3",
          "paperTitle": "Relation of Adjusters to Individual Mortals",
          "sectionTitle": "Erroneous Concepts of Adjuster Guidance",
          "paragraphId": "5",
          "text": "It is extremely dangerous to postulate as to the Adjuster content of the dream life. The Adjusters do work during sleep, but your ordinary dream experiences are purely physiologic and psychologic phenomena. Likewise, it is hazardous to attempt the differentiation of the Adjusters’ concept registry from the more or less continuous and conscious reception of the dictations of mortal conscience. These are problems which will have to be solved through individual discrimination and personal decision. But a human being would do better to err in rejecting an Adjuster’s expression through believing it to be a purely human experience than to blunder into exalting a reaction of the mortal mind to the sphere of divine dignity. Remember, the influence of a Thought Adjuster is for the most part, though not wholly, a superconscious experience.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">It is extremely dangerous to postulate as to the <span class=urantia-dev-highlighted>Adjuster</span> content of the dream life. The <span class=urantia-dev-highlighted>Adjusters</span> do work during sleep, but your ordinary dream experiences are purely physiologic and psychologic phenomena. Likewise, it is hazardous to attempt the differentiation of the <span class=urantia-dev-highlighted>Adjusters</span>’ concept registry from the more or less continuous and conscious reception of the dictations of mortal conscience. These are problems which will have to be solved through individual discrimination and personal decision. But a human being would do better to err in rejecting an <span class=urantia-dev-highlighted>Adjuster</span>’s expression through believing it to be a purely human experience than to blunder into exalting a reaction of the mortal mind to the sphere of divine dignity. Remember, the influence of a <span class=urantia-dev-highlighted>Thought</span> <span class=urantia-dev-highlighted>Adjuster</span> is for the most part, though not wholly, a superconscious experience.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:110.5.5.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 52.1,
                "fileSize": 1042560
              }
            }
          },
          "rank": 0.0748848,
          "match": "exact"
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 244,
        "totalPages": 122
      }
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search/semantic",
    "action": "semantic",
    "args": [],
    "select": {
      "q": "love",
      "include": "v1",
      "limit": 20,
      "page": 0,
      "paper_id": "2",
      "part_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "page",
      "limit",
      "paperId",
      "partId",
      "include"
    ],
    "queryArgs": [
      {
        "name": "include",
        "wire": "include"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "paper_id",
        "wire": "paperId"
      },
      {
        "name": "part_id",
        "wire": "partId"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "3:112.4.3",
          "standardReferenceId": "112:4.3",
          "sortId": "3.112.004.003",
          "paperId": "112",
          "sectionId": "4",
          "partId": "3",
          "paperTitle": "Personality Survival",
          "sectionTitle": "Adjusters After Death",
          "paragraphId": "3",
          "text": "Subsequent to physical death, except in individuals translated from among the living, the released Adjuster goes immediately to the home sphere of Divinington. The details of what transpires on that world during the time of awaiting the factual reappearance of the surviving mortal depend chiefly on whether the human being ascends to the mansion worlds in his own individual right or awaits a dispensational summoning of the sleeping survivors of a planetary age.",
          "htmlText": "<span class=\"urantia-dev-pb-0\">Subsequent to physical death, except in individuals translated from among the living, the released Adjuster goes immediately to the home sphere of Divinington. The details of what transpires on that world during the time of awaiting the factual reappearance of the surviving mortal depend chiefly on whether the human being ascends to the mansion worlds in his own individual right or awaits a dispensational summoning of the sleeping survivors of a planetary age.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:112.4.3.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 29,
                "fileSize": 579360
              }
            }
          },
          "similarity": 0.553150798189724,
          "strength": "weak",
          "match": "similar"
        },
        {
          "id": "3:112.3.4",
          "standardReferenceId": "112:3.4",
          "sortId": "3.112.003.004",
          "paperId": "112",
          "sectionId": "3",
          "partId": "3",
          "paperTitle": "Personality Survival",
          "sectionTitle": "The Phenomenon of Death",
          "paragraphId": "4",
          "text": "3. Physical (body and mind) death. When death overtakes a human being, the Adjuster remains in the citadel of the mind until it ceases to function as an intelligent mechanism, about the time that the measurable brain energies cease their rhythmic vital pulsations. Following this dissolution the Adjuster takes leave of the vanishing mind, just as unceremoniously as entry was made years before, and proceeds to Divinington by way of Uversa.",
          "htmlText": "<span class=\"urantia-dev-pb-2\">3. <em>Physical (body and mind) death.</em> When death overtakes a human being, the Adjuster remains in the citadel of the mind until it ceases to function as an intelligent mechanism, about the time that the measurable brain energies cease their rhythmic vital pulsations. Following this dissolution the Adjuster takes leave of the vanishing mind, just as unceremoniously as entry was made years before, and proceeds to Divinington by way of Uversa.</span>",
          "labels": [],
          "audio": {
            "tts-1-hd": {
              "nova": {
                "url": "https://cdn.urantia.dev/audio/eng/paragraphs/nova/tts-1-hd-nova-3:112.3.4.mp3",
                "format": "mp3",
                "bitrate": 160,
                "duration": 27.4,
                "fileSize": 547680
              }
            }
          },
          "similarity": 0.526940972060405,
          "strength": "weak",
          "match": "similar"
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 100,
        "totalPages": 50,
        "related": 0
      }
    },
    "idField": "id"
  },
  {
    "entity": "table_of_content",
    "accessor": "TableOfContent",
    "op": "load",
    "method": "GET",
    "path": "/toc",
    "args": [],
    "select": {
      "lang": "eng"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "lang"
    ],
    "queryArgs": [
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "parts": [
          {
            "id": "0",
            "title": "Foreword",
            "sponsorship": null,
            "papers": [
              {
                "id": "0",
                "title": "Foreword",
                "labels": [
                  "Theology",
                  "Cosmology"
                ]
              }
            ]
          },
          {
            "id": "1",
            "title": "The Central and Superuniverses",
            "sponsorship": "Sponsored by a Uversa Corps of Superuniverse Personalities acting by authority of the Orvonton Ancients of Days",
            "papers": [
              {
                "id": "1",
                "title": "The Universal Father",
                "labels": [
                  "Spirituality",
                  "Theology"
                ]
              },
              {
                "id": "2",
                "title": "The Nature of God",
                "labels": [
                  "Spirituality",
                  "Theology"
                ]
              }
            ]
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "tool",
    "accessor": "Tool",
    "op": "list",
    "method": "GET",
    "path": "/tools/anthropic",
    "action": "anthropic",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "server": {
        "name": "Urantia Papers API",
        "base_url": "https://api.urantia.dev"
      },
      "tools": [
        {
          "name": "get_table_of_contents",
          "description": "Get the full table of contents of the Urantia Papers. Returns the Foreword and the 4 parts, with all 197 papers and their titles.",
          "input_schema": {
            "type": "object",
            "properties": {}
          }
        },
        {
          "name": "list_papers",
          "description": "List all 197 Urantia Papers with their metadata (id, title, partId, labels). Use get_table_of_contents for a hierarchical view.",
          "input_schema": {
            "type": "object",
            "properties": {}
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "tool",
    "accessor": "Tool",
    "op": "list",
    "method": "GET",
    "path": "/tools/openai",
    "action": "openai",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "server": {
        "name": "Urantia Papers API",
        "base_url": "https://api.urantia.dev"
      },
      "tools": [
        {
          "type": "function",
          "function": {
            "name": "get_table_of_contents",
            "description": "Get the full table of contents of the Urantia Papers. Returns the Foreword and the 4 parts, with all 197 papers and their titles.",
            "parameters": {
              "type": "object",
              "properties": {}
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "list_papers",
            "description": "List all 197 Urantia Papers with their metadata (id, title, partId, labels). Use get_table_of_contents for a hierarchical view.",
            "parameters": {
              "type": "object",
              "properties": {}
            }
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "create",
    "method": "POST",
    "path": "/works/search",
    "action": "search",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "work": {
            "id": "dhammapada",
            "title": "The Dhammapada",
            "tradition": "Buddhist"
          },
          "reference": "Dhp 183",
          "text": "Not to commit any sin, to do good, and to purify one's mind, that is the teaching of (all) the Awakened.",
          "url": "https://www.gutenberg.org/cache/epub/2017/pg2017-images.html",
          "match": "reference",
          "urantiaParallels": [
            {
              "standardReferenceId": "131:3.5",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“No religionist may hope to attain the enlightenment of immortal wisdom who persists in being slothful, indolent, feeble, idle, shameless, and selfish. But whoso is thoughtful, prudent, reflective, fervent, and earnest — even while he yet lives on earth — may attain the supreme enlightenment of the peace and liberty of divine wisdom. Remember, every act shall receive its reward. Evil results in sorrow and sin ends in pain. Joy and happiness are the outcome of a good life. Even the evildoer enjoys a season of grace before the time of the full ripening of his evil deeds, but inevitably there must come the full harvest of evil-doing. Let no man think lightly of sin, saying in his heart: ‘The penalty of wrongdoing shall not come near me.’ What you do shall be done to you, in the judgment of wisdom. Injustice done to your fellows shall come back upon you. The creature cannot escape the destiny of his deeds.",
              "similarity": 0.533644,
              "rank": 1
            },
            {
              "standardReferenceId": "94:8.8",
              "paperTitle": "The Melchizedek Teachings in the Orient",
              "sectionTitle": "The Buddhist Faith",
              "text": "Closely linked to the doctrine of suffering and the escape therefrom was the philosophy of the Eightfold Path: right views, aspirations, speech, conduct, livelihood, effort, mindfulness, and contemplation. It was not Gautama’s intention to attempt to destroy all effort, desire, and affection in the escape from suffering; rather was his teaching designed to picture to mortal man the futility of pinning all hope and aspirations entirely on temporal goals and material objectives. It was not so much that love of one’s fellows should be shunned as that the true believer should also look beyond the associations of this material world to the realities of the eternal future.",
              "similarity": 0.526502,
              "rank": 2
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 1,
        "totalPages": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "create",
    "method": "POST",
    "path": "/works/search/semantic",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "work": {
            "id": "bhagavad-gita",
            "title": "The Bhagavad Gita",
            "tradition": "Hindu"
          },
          "reference": "BG 5.10-12",
          "text": "He who acteth, placing all actions in the Eternal, abandoning attachment, is unaffected by sin as a lotus leaf by the waters. Yogis, having abandoned attachment, perform action only by the body, by the mind, by the Reason, and even by the senses, for the purification of the self. The harmonised man, having abandoned the fruit of action, attaineth to the eternal Peace; the non-harmonised, impelled by desire, attached to fruit, are bound.",
          "url": "https://en.wikisource.org/wiki/Bhagavad-Gita_(Besant_4th)/Discourse_5#:~:text=He%20who%20acteth%2C%20placing",
          "similarity": 0.6211249682831,
          "strength": "related",
          "urantiaParallels": [
            {
              "standardReferenceId": "131:3.5",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“No religionist may hope to attain the enlightenment of immortal wisdom who persists in being slothful, indolent, feeble, idle, shameless, and selfish. But whoso is thoughtful, prudent, reflective, fervent, and earnest — even while he yet lives on earth — may attain the supreme enlightenment of the peace and liberty of divine wisdom. Remember, every act shall receive its reward. Evil results in sorrow and sin ends in pain. Joy and happiness are the outcome of a good life. Even the evildoer enjoys a season of grace before the time of the full ripening of his evil deeds, but inevitably there must come the full harvest of evil-doing. Let no man think lightly of sin, saying in his heart: ‘The penalty of wrongdoing shall not come near me.’ What you do shall be done to you, in the judgment of wisdom. Injustice done to your fellows shall come back upon you. The creature cannot escape the destiny of his deeds.",
              "similarity": 0.503438,
              "rank": 1
            },
            {
              "standardReferenceId": "131:3.3",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“Unrighteousness is contemptible; sin is despicable. Evil is degrading, whether held in thought or wrought out in deeds. Pain and sorrow follow in the path of evil as the dust follows the wind. Happiness and peace of mind follow pure thinking and virtuous living as the shadow follows the substance of material things. Evil is the fruit of wrongly directed thinking. It is evil to see sin where there is no sin; to see no sin where there is sin. Evil is the path of false doctrines. Those who avoid evil by seeing things as they are gain joy by thus embracing the truth. Make an end of your misery by loathing sin. When you look up to the Noble One, turn away from sin with a whole heart. Make no apology for evil; make no excuse for sin. By your efforts to make amends for past sins you acquire strength to resist future tendencies thereto. Restraint is born of repentance. Leave no fault unconfessed to the Noble One.",
              "similarity": 0.48021,
              "rank": 2
            }
          ]
        },
        {
          "work": {
            "id": "bhagavad-gita",
            "title": "The Bhagavad Gita",
            "tradition": "Hindu"
          },
          "reference": "BG 18.22-24",
          "text": "While that which clingeth to each one thing as if it were the whole, without reason, without grasping the reality, narrow, that is declared to be dark. An action which is ordained, done by one undesirous of fruit, devoid of attachment, without love or hate, that is called pure. But that action that is done by one longing for desires, or again with egoism, or with much effort, that is declared to be passionate.",
          "url": "https://en.wikisource.org/wiki/Bhagavad-Gita_(Besant_4th)/Discourse_18#:~:text=While%20that%20which%20clingeth",
          "similarity": 0.576521135633489,
          "strength": "weak",
          "urantiaParallels": [
            {
              "standardReferenceId": "102:3.3",
              "paperTitle": "The Foundations of Religious Faith",
              "sectionTitle": "Knowledge, Wisdom, and Insight",
              "text": "Material feelings, human emotions, lead directly to material actions, selfish acts. Religious insights, spiritual motivations, lead directly to religious actions, unselfish acts of social service and altruistic benevolence.",
              "similarity": 0.453268,
              "rank": 1
            },
            {
              "standardReferenceId": "131:3.3",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“Unrighteousness is contemptible; sin is despicable. Evil is degrading, whether held in thought or wrought out in deeds. Pain and sorrow follow in the path of evil as the dust follows the wind. Happiness and peace of mind follow pure thinking and virtuous living as the shadow follows the substance of material things. Evil is the fruit of wrongly directed thinking. It is evil to see sin where there is no sin; to see no sin where there is sin. Evil is the path of false doctrines. Those who avoid evil by seeing things as they are gain joy by thus embracing the truth. Make an end of your misery by loathing sin. When you look up to the Noble One, turn away from sin with a whole heart. Make no apology for evil; make no excuse for sin. By your efforts to make amends for past sins you acquire strength to resist future tendencies thereto. Restraint is born of repentance. Leave no fault unconfessed to the Noble One.",
              "similarity": 0.428849,
              "rank": 2
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 100,
        "totalPages": 50,
        "related": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "list",
    "method": "GET",
    "path": "/works/search",
    "action": "search",
    "args": [],
    "select": {
      "q": "love",
      "limit": 20,
      "page": 0,
      "urantia_parallel_limit": 3,
      "work": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "work",
      "page",
      "limit",
      "urantiaParallelLimit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "urantia_parallel_limit",
        "wire": "urantiaParallelLimit"
      },
      {
        "name": "work",
        "wire": "work"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "work": {
            "id": "bible",
            "title": "The Bible (World English Bible)",
            "tradition": "Jewish and Christian"
          },
          "reference": "Matthew 5:44",
          "text": "But I tell you, love your enemies, bless those who curse you, do good to those who hate you, and pray for those who mistreat you and persecute you,",
          "url": "https://ebible.org/eng-web/MAT05.htm#V44",
          "match": "exact",
          "urantiaParallels": [
            {
              "standardReferenceId": "140:3.16",
              "paperTitle": "The Ordination of the Twelve",
              "sectionTitle": "The Ordination Sermon",
              "text": "“Your Father in heaven makes the sun to shine on the evil as well as upon the good; likewise he sends rain on the just and the unjust. You are the sons of God; even more, you are now the ambassadors of my Father’s kingdom. Be merciful, even as God is merciful, and in the eternal future of the kingdom you shall be perfect, even as your heavenly Father is perfect.",
              "similarity": 0.709579,
              "rank": 1
            },
            {
              "standardReferenceId": "140:3.15",
              "paperTitle": "The Ordination of the Twelve",
              "sectionTitle": "The Ordination Sermon",
              "text": "“I say to you: Love your enemies, do good to those who hate you, bless those who curse you, and pray for those who despitefully use you. And whatsoever you believe that I would do to men, do you also to them.",
              "similarity": 0.708928,
              "rank": 2
            }
          ]
        },
        {
          "work": {
            "id": "bible",
            "title": "The Bible (World English Bible)",
            "tradition": "Jewish and Christian"
          },
          "reference": "Luke 6:27",
          "text": "“But I tell you who hear: love your enemies, do good to those who hate you,",
          "url": "https://ebible.org/eng-web/LUK06.htm#V27",
          "match": "exact",
          "urantiaParallels": [
            {
              "standardReferenceId": "140:3.15",
              "paperTitle": "The Ordination of the Twelve",
              "sectionTitle": "The Ordination Sermon",
              "text": "“I say to you: Love your enemies, do good to those who hate you, bless those who curse you, and pray for those who despitefully use you. And whatsoever you believe that I would do to men, do you also to them.",
              "similarity": 0.761205,
              "rank": 1
            },
            {
              "standardReferenceId": "159:5.11",
              "paperTitle": "The Decapolis Tour",
              "sectionTitle": "The Positive Nature of Jesus’ Religion",
              "text": "When Jesus instructed his apostles that they should, when one unjustly took away the coat, offer the other garment, he referred not so much to a literal second coat as to the idea of doing something positive to save the wrongdoer in the place of the olden advice to retaliate—“an eye for an eye” and so on. Jesus abhorred the idea either of retaliation or of becoming just a passive sufferer or victim of injustice. On this occasion he taught them the three ways of contending with, and resisting, evil:",
              "similarity": 0.53267,
              "rank": 2
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 21,
        "totalPages": 11
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "list",
    "method": "GET",
    "path": "/works/search/semantic",
    "args": [],
    "select": {
      "q": "love",
      "limit": 20,
      "page": 0,
      "urantia_parallel_limit": 3,
      "work": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "work",
      "page",
      "limit",
      "urantiaParallelLimit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "urantia_parallel_limit",
        "wire": "urantiaParallelLimit"
      },
      {
        "name": "work",
        "wire": "work"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "work": {
            "id": "dhammapada",
            "title": "The Dhammapada",
            "tradition": "Buddhist"
          },
          "reference": "Dhp 3-5",
          "text": "\"He abused me, he beat me, he defeated me, he robbed me,\"--in those who harbour such thoughts hatred will never cease. \"He abused me, he beat me, he defeated me, he robbed me,\"--in those who do not harbour such thoughts hatred will cease. For hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule.",
          "url": "https://www.gutenberg.org/cache/epub/2017/pg2017-images.html#:~:text=those%20who%20harbour%20such",
          "similarity": 0.663218010380599,
          "strength": "strong",
          "urantiaParallels": [
            {
              "standardReferenceId": "131:3.6",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Buddhism",
              "text": "“The fool has said in his heart, ‘Evil shall not overtake me’; but safety is found only when the soul craves reproof and the mind seeks wisdom. The wise man is a noble soul who is friendly in the midst of his enemies, tranquil among the turbulent, and generous among the grasping. Love of self is like weeds in a goodly field. Selfishness leads to grief; perpetual care kills. The tamed mind yields happiness. He is the greatest of warriors who overcomes and subdues himself. Restraint in all things is good. He alone is a superior person who esteems virtue and is observant of his duty. Let not anger and hate master you. Speak harshly of no one. Contentment is the greatest wealth. What is given wisely is well saved. Do not to others those things you would not wish done to you. Pay good for evil; overcome evil with the good.",
              "similarity": 0.412424,
              "rank": 1
            },
            {
              "standardReferenceId": "140:8.5",
              "paperTitle": "The Ordination of the Twelve",
              "sectionTitle": "Thursday Afternoon on the Lake",
              "text": "He never ceased to warn his disciples against the evil practice of retaliation; he made no allowance for revenge, the idea of getting even. He deplored the holding of grudges. He disallowed the idea of an eye for an eye and a tooth for a tooth. He discountenanced the whole concept of private and personal revenge, assigning these matters to civil government, on the one hand, and to the judgment of God, on the other. He made it clear to the three that his teachings applied to the individual, not the state. He summarized his instructions up to that time regarding these matters, as:",
              "similarity": 0.401049,
              "rank": 2
            }
          ]
        },
        {
          "work": {
            "id": "bible",
            "title": "The Bible (World English Bible)",
            "tradition": "Jewish and Christian"
          },
          "reference": "Proverbs 10:12",
          "text": "Hatred stirs up strife, but love covers all wrongs.",
          "url": "https://ebible.org/eng-web/PRO10.htm#V12",
          "similarity": 0.50763853796286,
          "strength": "weak",
          "urantiaParallels": [
            {
              "standardReferenceId": "131:2.11",
              "paperTitle": "The World’s Religions",
              "sectionTitle": "Judaism",
              "text": "“Love your neighbor as yourself; bear a grudge against no man. Whatsoever you hate do to no man. Love your brother, for the Lord has said: ‘I will love my children freely.’ The path of the just is as a shining light which shines more and more until the perfect day. They who are wise shall shine as the brightness of the firmament and they who turn many to righteousness as the stars forever and ever. Let the wicked forsake his evil way and the unrighteous man his rebellious thoughts. Says the Lord: ‘Let them return to me, and I will have mercy on them; I will abundantly pardon.’",
              "similarity": 0.491502,
              "rank": 1
            },
            {
              "standardReferenceId": "54:5.5",
              "paperTitle": "Problems of the Lucifer Rebellion",
              "sectionTitle": "The Wisdom of Delay",
              "text": "4. While wrongdoing is always deleterious to a family, wisdom and love admonish the upright children to bear with an erring brother during the time granted by the affectionate father in which the sinner may see the error of his way and embrace salvation.",
              "similarity": 0.466579,
              "rank": 2
            }
          ]
        }
      ],
      "meta": {
        "page": 0,
        "limit": 2,
        "total": 100,
        "totalPages": 50,
        "related": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "list",
    "method": "GET",
    "path": "/works",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "bible",
          "title": "The Bible (World English Bible)",
          "tradition": "Jewish and Christian",
          "religion": "Jewish and Christian",
          "kind": "scripture",
          "summary": "The Hebrew Bible, the deuterocanon, and the New Testament.",
          "translator": "World English Bible",
          "year": null,
          "refPrefix": null,
          "unitLabel": "verse",
          "units": 38034,
          "urantiaSection": null
        },
        {
          "id": "diogenes-laertius-6",
          "title": "Lives of Eminent Philosophers, Book 6: The Cynics",
          "religion": "Cynic",
          "tradition": "Cynic",
          "kind": "classic",
          "summary": "The lives and sayings of Diogenes and the other Cynic philosophers.",
          "translator": "R. D. Hicks",
          "year": 1925,
          "refPrefix": "DL",
          "unitLabel": "section",
          "units": 105,
          "urantiaSection": "131:1"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "load",
    "method": "GET",
    "path": "/works/{work}/{ref}/urantia-parallels",
    "action": "urantia_parallel",
    "args": [
      {
        "name": "id",
        "wire": "work",
        "value": "bhagavad-gita"
      },
      {
        "name": "ref",
        "wire": "ref",
        "value": "2.47"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "work": {
          "id": "bible",
          "title": "The Bible (World English Bible)",
          "tradition": "Jewish and Christian"
        },
        "reference": "John 3:16",
        "text": "For God so loved the world, that he gave his only born Son, that whoever believes in him should not perish, but have eternal life.",
        "url": "https://ebible.org/eng-web/JHN03.htm#V16",
        "urantiaParallels": [
          {
            "standardReferenceId": "142:6.6",
            "paperTitle": "The Passover at Jerusalem",
            "sectionTitle": "The Visit with Nicodemus",
            "text": "Nicodemus replied: “But I do not understand — how can that be?” Said Jesus: “Can it be that you are a teacher in Israel and yet ignorant of all this? It becomes, then, the duty of those who know about the realities of the spirit to reveal these things to those who discern only the manifestations of the material world. But will you believe us if we tell you of the heavenly truths? Do you have the courage, Nicodemus, to believe in one who has descended from heaven, even the Son of Man?”",
            "similarity": 0.699646,
            "rank": 1
          },
          {
            "standardReferenceId": "174:5.7",
            "paperTitle": "Tuesday Morning in the Temple",
            "sectionTitle": "The Inquiring Greeks",
            "text": "“He who believes this gospel, believes not merely in me but in Him who sent me. When you look upon me, you see not only the Son of Man but also Him who sent me. I am the light of the world, and whosoever will believe my teaching shall no longer abide in darkness. If you gentiles will hear me, you shall receive the words of life and shall enter forthwith into the joyous liberty of the truth of sonship with God. If my fellow countrymen, the Jews, choose to reject me and to refuse my teachings, I will not sit in judgment on them, for I came not to judge the world but to offer it salvation. Nevertheless, they who reject me and refuse to receive my teaching shall be brought to judgment in due season by my Father and those whom he has appointed to sit in judgment on such as reject the gift of mercy and the truths of salvation. Remember, all of you, that I speak not of myself, but that I have faithfully declared to you that which the Father commanded I should reveal to the children of men. And these words which the Father directed me to speak to the world are words of divine truth, everlasting mercy, and eternal life.",
            "similarity": 0.689726,
            "rank": 2
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "load",
    "method": "GET",
    "path": "/works/{work}/{ref}/work-parallels",
    "action": "work_parallel",
    "args": [
      {
        "name": "id",
        "wire": "work",
        "value": "bhagavad-gita"
      },
      {
        "name": "ref",
        "wire": "ref",
        "value": "2.47"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "work": {
          "id": "x",
          "title": "x",
          "tradition": "x"
        },
        "reference": "x",
        "text": "x",
        "url": "x",
        "chunk": {
          "label": "x",
          "references": [
            "x"
          ]
        },
        "parallels": [
          {
            "work": {
              "id": "x",
              "title": "x",
              "tradition": "x"
            },
            "reference": "x",
            "text": "x",
            "url": "x",
            "similarity": 1
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "work",
    "accessor": "Work",
    "op": "load",
    "method": "GET",
    "path": "/works/{work}/{ref}",
    "args": [
      {
        "name": "ref",
        "wire": "ref",
        "value": "2.47"
      },
      {
        "name": "work",
        "wire": "work",
        "value": "bhagavad-gita"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "work": {
            "id": "bhagavad-gita",
            "title": "The Bhagavad Gita",
            "tradition": "Hindu"
          },
          "reference": "BG 2.47",
          "text": "Thy business is with the action only, never with its fruits; so let not the fruit of action be thy motive, nor be thou to inaction attached.",
          "url": "https://en.wikisource.org/wiki/Bhagavad-Gita_(Besant_4th)/Discourse_2#:~:text=Thy%20business%20is%20with",
          "urantiaParallels": []
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
