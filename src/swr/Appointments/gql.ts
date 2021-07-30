export const allItem = `{
   _id,
   date {
      start,
      end
   },
   field {
      _id,
      name,
      location {
         coordinates
      },
      price,
   },
   state,
   pricePerPlayer,
   notes,
      stats {
      totalGoals,
      totalAssists,
      mvpElegible {
         type,
         player {
         ...on Player {
            _id,
            user {
               registry {
               name,
               surname
               }
            }
         },
         ...on FreeAgent {
            _id,
            name,
            surname
         }
         }
      },
      topScorers {
         type,
         player {
         ...on Player {
            _id,
            user {
               registry {
               name,
               surname
               }
            }
         },
         ...on FreeAgent {
            _id,
            name,
            surname
         }
         }
      },
      topAssistmen {
         type,
         player {
         ...on Player {
            _id,
            user {
               registry {
               name,
               surname
               }
            }
         },
         ...on FreeAgent {
            _id,
            name,
            surname
         }
         }
      },
         mvp {
         notes,
         player {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         }
      },
      individualStats {
         player {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         },
      rating,
         goals,
         assists,
         paidAmount,
         matchStats {
         total,
         won,
         lost,
         draw
         }
      }
   },
   matches {
      teamA {
         name,
         score,
         players {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         }
      },
      teamB {
         name,
         score,
         players {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         }
      },
      winner,
      notes
   },
   invites {
      lists {
         invited {
         totalResponses,
         player {
            _id,
            user {
               registry {
               name,
               surname
               }
            }
         }
         },
         declined {
         _id,
         user {
            registry {
               name,
               surname
            }
         }
         }
         waiting {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         },
         confirmed {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         },
         blacklisted {
         type,
         player {
            ...on Player {
               _id,
               user {
               registry {
                  name,
                  surname
               }
               }
            },
            ...on FreeAgent {
               _id,
               name,
               surname
            }
         }
         },
         ignored {
         _id,
         user {
            registry {
               name,
               surname
            }
         }
         }
      }
   }
}`

export const allList = `{
   result ${allItem},
   totalCount
}`