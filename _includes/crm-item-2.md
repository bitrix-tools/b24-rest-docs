{% list tabs %}

- Лид

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **dateCreateShort**     
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента (краткий формат).
 
  Поле выключено                                            ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **dateModifyShort**     
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента (краткий формат).
 
  Поле выключено                                ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор компании, привязанной к элементу                                                      ||
  || **contactId**           
  [`crm_contact`](/api-reference/data-types.html)    | Идентификатор контакта, привязанного к элементу                                                     ||
  || **stageId**             
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор стадии элемента                                                             ||
  || **isConvert**           
  [`boolean`](/api-reference/data-types.html)        | Сконвертирован ли лид.
  
  Поле выключено                                                               ||
  || **statusDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно о стадии                                                                              ||
  || **stageSemanticId**     
  [`string`](/api-reference/data-types.html)         | Группа стадии. Возможные значения:
  
  - `P` — в работе
  - `S` — успешная
  - `F` — неуспешная
  ||
  || **productId**           
  [`string`](/api-reference/data-types.html)         | Идентификатор товара.
  
  Устарело.
  
  Поле выключено                                                      ||
  || **opportunity**         
  [`double`](/api-reference/data-types.html)         | Сумма                                                                                               ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента                                                                       ||
  || **sourceId**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа источника                                                              ||
  || **sourceDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно об источнике                                                                          ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **name**                
  [`string`](/api-reference/data-types.html)         | Имя                                                                                                 ||
  || **lastName**            
  [`string`](/api-reference/data-types.html)         | Фамилия                                                                                             ||
  || **secondName**          
  [`string`](/api-reference/data-types.html)         | Отчество                                                                                            ||
  || **shortName**           
  [`string`](/api-reference/data-types.html)         | Фамилия Имя.
  
  Краткий формат: например 'Иванов Иван' -> 'Иванов И.'.
  
  Поле выключено                 ||
  || **companyTitle**        
  [`string`](/api-reference/data-types.html)         | Название компании                                                                                   ||
  || **post**                
  [`string`](/api-reference/data-types.html)         | Должность                                                                                           ||
  || **address**             
  [`text`](/api-reference/data-types.html)           | Адрес.
  
  Устарело.
  
  Поле выключено                                                                     ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор crm формы                                                                             ||
  || **originatorId**        
  [`string`](/api-reference/data-types.html)         | Внешний источник                                                                                    ||
  || **originId**            
  [`string`](/api-reference/data-types.html)         | Идентификатор элемента во внешнем источнике                                                         ||
  || **dateClosed**          
  [`datetime`](/api-reference/data-types.html)       | Время закрытия элемента                                                                             ||
  || **birthdate**           
  [`date`](/api-reference/data-types.html)           | Дата рождения                                                                                       ||
  || **honorific**           
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа обращения                                                              ||
  || **hasPhone**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента телефон                                                                       ||
  || **hasEmail**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента почта                                                                         ||
  || **hasImol**             
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента открытые линии                                                                ||
  || **login**               
  [`string`](/api-reference/data-types.html)         | Логин.
  
  Устарело.
  
  Поле выключено                                                                    ||
  || **isReturnCustomer**    
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент повторным                                                                       ||
  || **searchContent**       
  [`text`](/api-reference/data-types.html)           | Информация для полнотекстового поиска.
  
  Служебное поле                                               ||
  || **isManualOpportunity** 
  [`boolean`](/api-reference/data-types.html)        | Установлен ли ручной режим расчеты суммы                                                            ||
  || **movedBy**             
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним сменил стадию                                         ||
  || **movedTime**           
  [`datetime`](/api-reference/data-types.html)       | Время последней смены стадии                                                                        ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **phoneMobile**         
  [`string`](/api-reference/data-types.html)         | Мобильный телефон                                                                                   ||
  || **phoneWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий телефон                                                                                     ||
  || **phoneMailing**        
  [`string`](/api-reference/data-types.html)         | Телефон для рассылок                                                                                ||
  || **emailHome**           
  [`string`](/api-reference/data-types.html)         | Личный E-mail                                                                                       ||
  || **emailWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий E-mail                                                                                      ||
  || **emailMailing**        
  [`string`](/api-reference/data-types.html)         | Почта для рассылок                                                                                  ||
  || **skype**               
  [`string`](/api-reference/data-types.html)         | Skype                                                                                               ||
  || **icq**                 
  [`string`](/api-reference/data-types.html)         | ICQ                                                                                                 ||
  || **imol**                
  [`string`](/api-reference/data-types.html)         | IMOL                                                                                                ||
  || **email**               
  [`string`](/api-reference/data-types.html)         | E-mail                                                                                              ||
  || **phone**               
  [`string`](/api-reference/data-types.html)         | Телефон                                                                                             ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие                                           ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры                                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании                                                                     ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании.
  
  Например, для контекстных объявлений                                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании.
  
  Например, ключевые слова контекстной рекламы                              ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         | Список идентификаторов пользователей, которые являются Наблюдателями                                ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  | Список идентификаторов контактов, привязанных к элементу                                            ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
      - `id` — идентификатор
      - `url` — ссылка на файл на портале
      - `urlMachine` — ссылка на файл для приложения

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`||
  || **fm**
  [`multifield`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `id` — Уникальный идентификатор
    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  ||
  |#

- Сделка

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **dateCreateShort**     
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента (краткий формат).
  
  Поле выключено                                            ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **dateModifyShort**     
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента (краткий формат).
  
  Поле выключено                                ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **leadId**              
  [`crm_lead`](/api-reference/data-types.html)       | Идентификатор лида, на основании, которого создан элемент                                           ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор компании, привязанной к элементу                                                      ||
  || **contactId**           
  [`crm_contact`](/api-reference/data-types.html)    | Идентификатор контакта, привязанного к элементу                                                     ||
  || **quoteId**             
  [`crm_quote`](/api-reference/data-types.html)      | Идентификатор предложения, привязанного к элементу                                                  ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **productId**           
  [`string`](/api-reference/data-types.html)         | Идентификатор товара. 
  
  Устарело. Поле выключено                                                      ||
  || **categoryId**          
  [`crm_category`](/api-reference/data-types.html)   | Идентификатор воронки (направления) элемента                                                        ||
  || **stageId**             
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор стадии элемента                                                             ||
  || **stageSemanticId**     
  [`string`](/api-reference/data-types.html)         | Группа стадии

  - `P` — в работе
  - `S` — успешная
  - `F` — неуспешная
  ||
  || **isNew**               
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка новой                                                                            ||
  || **isRecurring**         
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка повторной                                                                        ||
  || **isReturnCustomer**    
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент повторным                                                                       ||
  || **isRepeatedApproach**  
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка повторным обращением                                                             ||
  || **closed**              
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка закрытой                                                                         ||
  || **typeId**              
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа сделки                                                                 ||
  || **opportunity**         
  [`double`](/api-reference/data-types.html)         | Сумма                                                                                               ||
  || **isManualOpportunity** 
  [`boolean`](/api-reference/data-types.html)        | Установлен ли ручной режим расчеты суммы                                                            ||
  || **taxValue**            
  [`double`](/api-reference/data-types.html)         | Сумма налога                                                                                        ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента                                                                       ||
  || **probability**         
  [`integer`](/api-reference/data-types.html)        | Вероятность, %                                                                                      ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **begindate**           
  [`date`](/api-reference/data-types.html)           | Дата начала элемента                                                                                ||
  || **begindateShort**      
  [`datetime`](/api-reference/data-types.html)       | Время начала элемента (краткий формат).
  
  Поле выключено                                              ||
  || **closedate**           
  [`date`](/api-reference/data-types.html)           | Дата завершения элемента                                                                            ||
  || **closedateShort**      
  [`datetime`](/api-reference/data-types.html)       | Время окончания элемента (краткий формат).
  
  Поле выключено                                           ||
  || **eventDate**           
  [`datetime`](/api-reference/data-types.html)       | Дата события                                                                                        ||
  || **eventDateShort**      
  [`datetime`](/api-reference/data-types.html)       | Дата события (краткий формат).
  
  Поле выключено                                                       ||
  || **eventId**             
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа события                                                                ||
  || **eventDescription**    
  [`text`](/api-reference/data-types.html)           | Описание события                                                                                    ||
  || **locationId**          
  [`location`](/api-reference/data-types.html)       | Идентификатор местоположения. 
  
  Служебное поле                                                        ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор crm формы                                                                             ||
  || **sourceId**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа источника                                                              ||
  || **sourceDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно об источнике                                                                          ||
  || **originatorId**        
  [`string`](/api-reference/data-types.html)         | Внешний источник                                                                                    ||
  || **originId**            
  [`string`](/api-reference/data-types.html)         | Идентификатор элемента во внешнем источнике                                                         ||
  || **additionalInfo**      
  [`string`](/api-reference/data-types.html)         | Дополнительная информация                                                                           ||
  || **searchContent**       
  [`text`](/api-reference/data-types.html)           | Информация для полнотекстового поиска.
  
  Служебное поле                                               ||
  || **orderStage**          
  [`string`](/api-reference/data-types.html)         | Статус оплаты сделки                                                                                ||
  || **movedBy**             
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним сменил стадию                                         ||
  || **movedTime**           
  [`datetime`](/api-reference/data-types.html)       | Время последней смены стадии                                                                        ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **isWork**              
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка в работе.
  
  Поле выключено                                                         ||
  || **isWon**               
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка выигранной.
  
  Поле выключено                                                       ||
  || **isLose**              
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка проваленной.
  
  Поле выключено                                                      ||
  || **receivedAmount**      
  [`string`](/api-reference/data-types.html)         | Полученная сумма.
  
  Поле выключено                                                                    ||
  || **lostAmount**          
  [`string`](/api-reference/data-types.html)         | Утраченная сумма.
  
  Поле выключено                                                                    ||
  || **hasProducts**         
  [`boolean`](/api-reference/data-types.html)        | Содержит ли элемент товары.
  
  Поле выключено                                                          ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие                                           ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры                                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании                                                                     ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений                                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы                              ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         | Список идентификаторов пользователей, который являются Наблюдателями                                ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  | Список идентификаторов контактов, привязанных к элементу                                            ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор
        - `url` — ссылка на файл на портале
        - `urlMachine` — ссылка на файл для приложения

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель (Элемент другого типа объекта CRM, который привязан к данному элементу).

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

- Контакт

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор компании, привязанной к элементу                                                      ||
  || **sourceId**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа источника                                                              ||
  || **sourceDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно об источнике                                                                          ||
  || **name**                
  [`string`](/api-reference/data-types.html)         | Имя                                                                                                 ||
  || **lastName**            
  [`string`](/api-reference/data-types.html)         | Фамилия                                                                                             ||
  || **secondName**          
  [`string`](/api-reference/data-types.html)         | Отчество                                                                                            ||
  || **shortName**           
  [`string`](/api-reference/data-types.html)         | Фамилия Имя.
  
  Краткий формат: например 'Иванов Иван' -> 'Иванов И.'.
  
  Поле выключено                 ||
  || **photo**               
  [`file`](/api-reference/data-types.html)           | Фотография                                                                                          ||
  || **post**                
  [`string`](/api-reference/data-types.html)         | Должность                                                                                           ||
  || **address**             
  [`text`](/api-reference/data-types.html)           | Адрес. 
  
  Устарело. Поле выключено                                                                     ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **leadId**              
  [`crm_lead`](/api-reference/data-types.html)       | Идентификатор лида, на основании, которого создан элемент                                           ||
  || **export**              
  [`boolean`](/api-reference/data-types.html)        | Разрешено ли экспортировать контакт                                                                 ||
  || **typeId**              
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа сделки                                                                 ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор crm формы                                                                             ||
  || **originatorId**        
  [`string`](/api-reference/data-types.html)         | Внешний источник                                                                                    ||
  || **originId**            
  [`string`](/api-reference/data-types.html)         | Идентификатор элемента во внешнем источнике                                                         ||
  || **originVersion**       
  [`string`](/api-reference/data-types.html)         | Версия оригинала                                                                                    ||
  || **birthdate**           
  [`date`](/api-reference/data-types.html)           | Дата рождения                                                                                       ||
  || **honorific**           
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа обращения                                                              ||
  || **hasPhone**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента телефон                                                                       ||
  || **hasEmail**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента почта                                                                         ||
  || **hasImol**             
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента открытые линии                                                                ||
  || **searchContent**       
  [`text`](/api-reference/data-types.html)           | Информация для полнотекстового поиска. Служебное поле                                               ||
  || **categoryId**          
  [`crm_category`](/api-reference/data-types.html)   | Идентификатор воронки (направления) элемента                                                        ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **login**               
  [`string`](/api-reference/data-types.html)         | Логин.
  
  Устарело. Поле выключено                                                                    ||
  || **emailHome**           
  [`string`](/api-reference/data-types.html)         | Личный E-mail                                                                                       ||
  || **emailWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий E-mail                                                                                      ||
  || **emailMailing**        
  [`string`](/api-reference/data-types.html)         | Почта для рассылок                                                                                  ||
  || **phoneMobile**         
  [`string`](/api-reference/data-types.html)         | Мобильный телефон                                                                                   ||
  || **phoneWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий телефон                                                                                     ||
  || **phoneMailing**        
  [`string`](/api-reference/data-types.html)         | Телефон для рассылок                                                                                ||
  || **imol**                
  [`string`](/api-reference/data-types.html)         | IMOL                                                                                                ||
  || **email**               
  [`string`](/api-reference/data-types.html)         | E-mail                                                                                              ||
  || **phone**               
  [`string`](/api-reference/data-types.html)         | Телефон                                                                                             ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие                                           ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры                                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании                                                                     ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений                                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы                              ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         | Список идентификаторов пользователей, который являются Наблюдателями                                ||
  || **companyIds**          
  [`crm_company[]`](/api-reference/data-types.html)  | Список идентификаторов компаний, привязанных к элементу                                             ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей отдаются в виде массива
    *- Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор
        - `url` — ссылка на файл на портале
        - `urlMachine` — ссылка на файл для приложения

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}` ||
  || **fm**
  [`multifield`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `id` — Уникальный идентификатор
    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  ||
  |#

- Компания

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **logo**                
  [`file`](/api-reference/data-types.html)           | Логотип                                                                                             ||
  || **address**             
  [`text`](/api-reference/data-types.html)           | Адрес. 
  
  Устарело. Поле выключено                                                                     ||
  || **addressLegal**        
  [`text`](/api-reference/data-types.html)           | Юридический адрес.
  
  Устарело                                                                        ||
  || **bankingDetails**      
  [`string`](/api-reference/data-types.html)         | Банковские реквизиты                                                                                ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **typeId**              
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа сделки                                                                 ||
  || **industry**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа индустрии                                                              ||
  || **revenue**             
  [`double`](/api-reference/data-types.html)         | Годовой оборот                                                                                      ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента                                                                       ||
  || **employees**           
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа кол-ва сотрудников                                                     ||
  || **leadId**              
  [`crm_lead`](/api-reference/data-types.html)       | Идентификатор лида, на основании, которого создан элемент                                           ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор crm формы                                                                             ||
  || **originatorId**        
  [`string`](/api-reference/data-types.html)         | Внешний источник                                                                                    ||
  || **originId**            
  [`string`](/api-reference/data-types.html)         | Идентификатор элемента во внешнем источнике                                                         ||
  || **originVersion**       
  [`string`](/api-reference/data-types.html)         | Версия оригинала                                                                                    ||
  || **hasPhone**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента телефон                                                                       ||
  || **hasEmail**            
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента почта                                                                         ||
  || **hasImol**             
  [`boolean`](/api-reference/data-types.html)        | Имеется ли у элемента открытые линии                                                                ||
  || **isMyCompany**         
  [`boolean`](/api-reference/data-types.html)        | Является ли компания моей компанией                                                                 ||
  || **searchContent**       
  [`text`](/api-reference/data-types.html)           | Информация для полнотекстового поиска.
  
  Служебное поле                                               ||
  || **categoryId**          
  [`crm_category`](/api-reference/data-types.html)   | Идентификатор воронки (направления) элемента                                                        ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **emailHome**           
  [`string`](/api-reference/data-types.html)         | Личный E-mail                                                                                       ||
  || **emailWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий E-mail                                                                                      ||
  || **emailMailing**        
  [`string`](/api-reference/data-types.html)         | Почта для рассылок                                                                                  ||
  || **phoneMobile**         
  [`string`](/api-reference/data-types.html)         | Мобильный телефон                                                                                   ||
  || **phoneWork**           
  [`string`](/api-reference/data-types.html)         | Рабочий телефон                                                                                     ||
  || **phoneMailing**        
  [`string`](/api-reference/data-types.html)         | Телефон для рассылок                                                                                ||
  || **imol**                
  [`string`](/api-reference/data-types.html)         | IMOL                                                                                                ||
  || **email**               
  [`string`](/api-reference/data-types.html)         | E-mail                                                                                              ||
  || **phone**               
  [`string`](/api-reference/data-types.html)         | Телефон                                                                                             ||
  || **ufLogo**              
  [`file`](/api-reference/data-types.html)           | Логотип (генератор документов)                                                                     ||
  || **ufStamp**             
  [`file`](/api-reference/data-types.html)           | Печать организации (генератор документов)                                                           ||
  || **ufDirectorSign**      
  [`file`](/api-reference/data-types.html)           | Подпись директора (генератор документов)                                                            ||
  || **ufAccountantSign**    
  [`file`](/api-reference/data-types.html)           | Подпись гл. бухгалтера (генератор документов)                                                       ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие                                           ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры                                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании                                                                     ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений                                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы                              ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         | Список идентификаторов пользователей, который являются Наблюдателями                                ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  | Список идентификаторов контактов, привязанных к элементу                                            ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html)

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор
        - `url` — ссылка на файл на портале
        - `urlMachine` — ссылка на файл для приложения

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель (Элемент другого типа объекта CRM, который привязан к данному элементу).

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}` ||
  || **fm**
  [`multifield`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `id` — Уникальный идентификатор
    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  ||
  |#

- Предложение

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **dateCreateShort**     
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента (краткий формат).
  
  Поле выключено                                            ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **dateModifyShort**     
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента (краткий формат).
  
  Поле выключено                                ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **leadId**              
  [`crm_lead`](/api-reference/data-types.html)       | Идентификатор лида, на основании, которого создан элемент                                           ||
  || **dealId**              
  [`crm_deal`](/api-reference/data-types.html)       | Идентификатор сделки, привязанной к элементу                                                        ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор компании, привязанной к элементу                                                      ||
  || **contactId**           
  [`crm_contact`](/api-reference/data-types.html)    | Идентификатор контакта, привязанного к элементу                                                     ||
  || **personTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа плательщика                                                                      ||
  || **mycompanyId**         
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор «моей» компании                                                                       ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **stageId**             
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор стадии элемента                                                             ||
  || **closed**              
  [`boolean`](/api-reference/data-types.html)        | Является ли сделка закрытой                                                                         ||
  || **opportunity**         
  [`double`](/api-reference/data-types.html)         | Сумма                                                                                               ||
  || **isManualOpportunity** 
  [`boolean`](/api-reference/data-types.html)        | Установлен ли ручной режим расчеты суммы                                                            ||
  || **taxValue**            
  [`double`](/api-reference/data-types.html)         | Сумма налога                                                                                        ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента                                                                       ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **commentsType**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа комментария.

  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **begindate**           
  [`date`](/api-reference/data-types.html)           | Дата начала элемента                                                                                ||
  || **begindateShort**      
  [`datetime`](/api-reference/data-types.html)       | Время начала элемента (краткий формат).
  
  Поле выключено                                              ||
  || **closedate**           
  [`date`](/api-reference/data-types.html)           | Дата завершения элемента                                                                            ||
  || **closedateShort**      
  [`datetime`](/api-reference/data-types.html)       | Время окончания элемента (краткий формат).
  
  Поле выключено                                           ||
  || **quoteNumber**         
  [`string`](/api-reference/data-types.html)         | Номер предложения                                                                                   ||
  || **content**             
  [`text`](/api-reference/data-types.html)           | Содержание                                                                                          ||
  || **contentType**         
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа содержания.

  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **terms**               
  [`text`](/api-reference/data-types.html)           | Условия                                                                                             ||
  || **termsType**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа условия.

  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **storageTypeId**       
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа хранения                                                                         ||
  || **storageElementIds**   
  [`integer[]`](/api-reference/data-types.html)      | Массив файлов                                                                                       ||
  || **locationId**          
  [`location`](/api-reference/data-types.html)       | Идентификатор местоположения. Служебное поле                                                        ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор crm формы                                                                             ||
  || **clientTitle**         
  [`string`](/api-reference/data-types.html)         | Название клиента                                                                                    ||
  || **clientAddr**          
  [`string`](/api-reference/data-types.html)         | Адрес клиента                                                                                       ||
  || **clientContact**       
  [`string`](/api-reference/data-types.html)         | Контакты клиента                                                                                    ||
  || **clientEmail**         
  [`string`](/api-reference/data-types.html)         | E-mail клиента                                                                                      ||
  || **clientPhone**         
  [`string`](/api-reference/data-types.html)         | Телефон клиента                                                                                     ||
  || **clientTpId**          
  [`string`](/api-reference/data-types.html)         | ИНН Клиента                                                                                         ||
  || **clientTpaId**         
  [`string`](/api-reference/data-types.html)         | ТПП Клиента                                                                                         ||
  || **searchContent**       
  [`text`](/api-reference/data-types.html)           | Информация для полнотекстового поиска. Служебное поле                                               ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **hasProducts**         
  [`boolean`](/api-reference/data-types.html)        | Содержит ли элемент товары.
  
  Поле выключено                                                          ||
  || **actualDate**          
  [`date`](/api-reference/data-types.html)           | Актуально до                                                                                        ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие                                           ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры                                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании                                                                     ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений                                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы                             ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  | Список идентификаторов контактов, привязанных к элементу                                            ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор;
        - `url` — ссылка на файл на портале;
        - `urlMachine` — ссылка на файл для приложения.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель (Элемент другого типа объекта CRM, который привязан к данному элементу).

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

- Счет

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **xmlId**               
  [`string`](/api-reference/data-types.html)         | Внешний код                                                                                         ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **movedBy**             
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним сменил стадию                                         ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **movedTime**           
  [`datetime`](/api-reference/data-types.html)       | Время последней смены стадии                                                                        ||
  || **categoryId**          
  [`crm_category`](/api-reference/data-types.html)   | Идентификатор воронки (направления) элемента                                                        ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **stageId**             
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор стадии элемента                                                             ||
  || **previousStageId**     
  [`crm_status`](/api-reference/data-types.html)     | Идентификатор типа предыдущей стадии                                                                ||
  || **begindate**           
  [`date`](/api-reference/data-types.html)           | Дата начала элемента                                                                                ||
  || **closedate**           
  [`date`](/api-reference/data-types.html)           | Дата завершения элемента                                                                            ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор компании, привязанной к элементу                                                      ||
  || **contactId**           
  [`crm_contact`](/api-reference/data-types.html)    | Идентификатор контакта, привязанного к элементу                                                     ||
  || **opportunity**         
  [`double`](/api-reference/data-types.html)         | Сумма                                                                                               ||
  || **isManualOpportunity** 
  [`boolean`](/api-reference/data-types.html)        | Установлен ли ручной режим расчеты суммы                                                            ||
  || **taxValue**            
  [`double`](/api-reference/data-types.html)         | Сумма налога                                                                                        ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента                                                                       ||
  || **mycompanyId**         
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор «моей» компании                                                                       ||
  || **sourceId**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа источника                                                              ||
  || **sourceDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно об источнике                                                                          ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор CRM формы                                                                             ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **comments**            
  [`text`](/api-reference/data-types.html)           | Комментарий                                                                                         ||
  || **accountNumber**       
  [`string`](/api-reference/data-types.html)         | Номер счета                                                                                         ||
  || **locationId**          
  [`location`](/api-reference/data-types.html)       | Идентификатор местоположения.
  
  Служебное поле                                                        ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие.
  
  Поле выключено                          ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры
  
  Поле выключено                                      ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании.
  
  Поле выключено                                                    ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений.
  
  Поле выключено                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы.
  
  Поле выключено              ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         | Список идентификаторов пользователей, которые являются Наблюдателями                                ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  | Список идентификаторов контактов, привязанных к элементу                                            ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html)

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор;
        - `url` — ссылка на файл на портале;
        - `urlMachine` — ссылка на файл для приложения.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель (Элемент другого типа объекта CRM, который привязан к данному элементу).

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

- Смарт-процесс

  #|
  || **Название**
  `тип` | **Описание** ||
  || **id**                  
  [`integer`](/api-reference/data-types.html)        | Идентификатор элемента                                                                              ||
  || **xmlId**               
  [`string`](/api-reference/data-types.html)         | Внешний код                                                                                         ||
  || **title**               
  [`string`](/api-reference/data-types.html)         | Название элемента                                                                                   ||
  || **createdBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который создал элемент                                                  ||
  || **updatedBy**           
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который изменил элемент                                                 ||
  || **movedBy**             
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним сменил стадию.

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **createdTime**         
  [`datetime`](/api-reference/data-types.html)       | Время создания элемента                                                                             ||
  || **updatedTime**         
  [`datetime`](/api-reference/data-types.html)       | Время последнего изменения элемента                                                                 ||
  || **movedTime**           
  [`datetime`](/api-reference/data-types.html)       |  Время последней смены стадии.

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **categoryId**          
  [`crm_category`](/api-reference/data-types.html)   | Идентификатор воронки (направления) элемента                                                        ||
  || **opened**              
  [`boolean`](/api-reference/data-types.html)        | Является ли элемент открытым                                                                        ||
  || **stageId**             
  [`crm_status`](/api-reference/data-types.html)     |  Строковый идентификатор стадии элемента.

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **previousStageId**     
  [`crm_status`](/api-reference/data-types.html)     |  Идентификатор типа предыдущей стадии.

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **begindate**           
  [`date`](/api-reference/data-types.html)           |  Дата начала элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса
  ||
  || **closedate**           
  [`date`](/api-reference/data-types.html)           |  Дата завершения элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса
  ||
  || **companyId**           
  [`crm_company`](/api-reference/data-types.html)    |  Идентификатор компании, привязанной к элементу.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  || **contactId**           
  [`crm_contact`](/api-reference/data-types.html)    | Идентификатор контакта, привязанного к элементу.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  || **opportunity**         
  [`double`](/api-reference/data-types.html)         | Сумма.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **isManualOpportunity** 
  [`boolean`](/api-reference/data-types.html)        | Установлен ли ручной режим расчеты суммы.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **taxValue**            
  [`double`](/api-reference/data-types.html)         | Сумма налога.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **currencyId**          
  [`crm_currency`](/api-reference/data-types.html)   | Идентификатор валюты элемента.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **opportunityAccount**  
  [`double`](/api-reference/data-types.html)         | Сумма в валюте учета. 
  
  Устарело. Поле выключено.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **taxValueAccount**     
  [`double`](/api-reference/data-types.html)         | Сумма налога в валюте учета. 
  
  Устарело. Поле выключено.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **accountCurrencyId**   
  [`crm_currency`](/api-reference/data-types.html)   | Валюта учета.
  
  Поле выключено.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **mycompanyId**         
  [`crm_company`](/api-reference/data-types.html)    | Идентификатор «моей» компании.

  Доступно лишь при включенной настройке `isMycompanyEnabled` у соответствующего смарт-процесса
  ||
  || **sourceId**            
  [`crm_status`](/api-reference/data-types.html)     | Строковый идентификатор типа источника.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса
  ||
  || **sourceDescription**   
  [`text`](/api-reference/data-types.html)           | Дополнительно об источнике.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса
  ||
  || **webformId**           
  [`integer`](/api-reference/data-types.html)        | Идентификатор CRM формы                                                                             ||
  || **assignedById**        
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя ответственного за элемент                                                ||
  || **lastActivityBy**      
  [`user`](/api-reference/data-types.html)           | Идентификатор пользователя, который последним проявлял активность в таймлайне                       ||
  || **lastActivityTime**    
  [`datetime`](/api-reference/data-types.html)       | Время, последнего проявления активности в таймлайне                                                 ||
  || **utmSource**           
  [`string`](/api-reference/data-types.html)         | Рекламная система. Yandex-Direct, Google-Adwords и другие.
  
  Поле выключено                          ||
  || **utmMedium**           
  [`string`](/api-reference/data-types.html)         | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры
  
  Поле выключено                                       ||
  || **utmCampaign**         
  [`string`](/api-reference/data-types.html)         | Обозначение рекламной кампании.
  
  Поле выключено                                                    ||
  || **utmContent**          
  [`string`](/api-reference/data-types.html)         | Содержание кампании. Например, для контекстных объявлений.
  
  Поле выключено                          ||
  || **utmTerm**             
  [`string`](/api-reference/data-types.html)         | Условие поиска кампании. Например, ключевые слова контекстной рекламы.
  
  Поле выключено             ||
  || **observers**           
  [`user[]`](/api-reference/data-types.html)         |
  Список идентификаторов пользователей, который являются Наблюдателями.

  Доступно лишь при включенной настройке `isObserversEnabled` у соответствующего смарт-процесса
  ||
  || **contactIds**          
  [`crm_contact[]`](/api-reference/data-types.html)  |
  Список идентификаторов контактов, привязанных к элементу.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  || **entityTypeId**        
  [`integer`](/api-reference/data-types.html)        | Идентификатор типа сущности                                                                         ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей отдаются в виде массива
    - Значение поля типа `file` отдаются в виде объекта:
        - `id` — идентификатор;
        - `url` — ссылка на файл на портале;
        - `urlMachine` — ссылка на файл для приложения.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

{% endlist %}