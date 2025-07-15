# Как добавить шаблон и создать документ на его основе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Автоматизировать работу с документами в CRM можно с помощью скрипта. Он будет выполнять полный цикл генерации документа: создавать нумератор, загружать шаблон в формате `.docx` и формировать документ по конкретной сделке.

Чтобы создать документ, последовательно выполним методы:

1. [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) — создадим нумератор документа,

2. [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) — загрузим шаблон документа,

3. [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) — сгенерируем документ.

## Подготовим переменные

Определим основные переменные, которые будем использовать в процессе генерации документа.

-  `filePath` — путь к файлу шаблона. Укажем `template.docx`.

-  `iDealID` — идентификатор сделки. Создадим документ для сделки с идентификатором `1`.

-  `sDocName` — имя создаваемого документа. Укажем `Демонстрационная реализация товара`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

   ```javascript
   let filePath = 'template.docx'; 
   let iDealID = 1; 
   let sDocName = 'Демонстрационная реализация товара';
   ```

-  PHP

   ```php
   $filePath = __DIR__ . '/template.docx';  
   $iDealID = 1;  
   $sDocName = 'Демонстрационная реализация товара';
   ```

{% endlist %}

## 1\. Создадим нумератор документа

Создадим нумератор для документов с помощью [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md). В метод передадим два параметра.

-  `name` — название нумератора. Укажем `Rest Numerator`.

-  `template` — шаблон, по которому будет генерироваться номер документа. Укажем `{NUMBER}` — это переменная, которая будет заменена на порядковый номер. Можно использовать другие переменные, например, `{DAY}` —текущий день, `{CLIENT_ID}` — идентификатор клиента, `{RANDOM}` — случайный номер.

{% list tabs %}

-  JS

   ```javascript
   BX24.callMethod(
       'crm.documentgenerator.numerator.add',
       {
           'fields': {
               'name': 'Нумератор из REST',
               'template': '{NUMBER}'
           }
       },
       function(resNum) {
           if (resNum.error()) {
               console.error(resNum.error());
               alert('Нумератор не добавлен: ' + resNum.error_description());
               return;
           }
       }
   );
   ```

-  PHP

   ```php
   $resNum = CRest::call(
       'crm.documentgenerator.numerator.add',
       [
           'fields' => [
               'name' => 'Нумератор из REST',
               'template' => '{NUMBER}',
           ]
       ]
   );
   ```

{% endlist %}

Метод [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) вернет объект `resNum` с информацией о созданном нумераторе.

```json
"numerator":{
    "name":"Нумератор из REST",
    "template":"{NUMBER}",
    "id":43,
    "code":null,
    "settings":{
        "Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{
            "start":1,
            "step":1,
            "length":0,
            "padString":"0",
            "periodicBy":null,
            "timezone":null,
            "isDirectNumeration":false
        }
    }
}
```

## 2\. Загрузим шаблон документа

Если нумератор создан, добавим шаблон документа с помощью метода [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md).

{% note warning "" %}

Содержимое файла шаблона нужно преобразовать в формат [Base64](../../../api-reference/files/how-to-upload-files.md).

{% endnote %}

В [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) нужно передать следующие данные:

-  `name` — название шаблона. Укажем переменную `sDocName`.

-  `numeratorId` — идентификатор нумератора. Передадим его из объекта `resNum`, который получен на первом шаге.

-  `region` — регион шаблона. Влияет на локализацию, например, валюту и дату. Укажем `ru` — Россия.

-  `users` — массив прав доступа. Определяет, какие группы пользователей могут видеть и использовать шаблон. Укажем `UA` — все авторизованные пользователи.

-  `entityTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `2` — сделка. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

-  `file` — контент файла `filePath`, который преобразован в формат Base64.

{% list tabs %}

-  JS

   ```javascript
   function fileToBase64(filePath) {
       return new Promise((resolve, reject) => {
           fetch(filePath)
               .then(response => response.blob())
               .then(blob => {
                   let reader = new FileReader();
                   reader.onloadend = () => resolve(reader.result.split(',')[1]);
                   reader.onerror = reject;
                   reader.readAsDataURL(blob);
               });
       });
   }
   
   let fileContent = await fileToBase64(filePath);
   
   BX24.callMethod(
       'crm.documentgenerator.template.add',
       {
           'fields': {
               'name': sDocName,
               'numeratorId': resNum.data().numerator.id,
               'region': 'ru',
               'users': ['UA'],
               'entityTypeId': ['2'],
               'file': fileContent
           }
       },
       function(resTemplate) {
           if (resTemplate.error()) {
               console.error(resTemplate.error());
               alert('Шаблон не добавлен: ' + resTemplate.error_description());
               return;
           }
       }
   );
   ```

-  PHP

   ```php
   $resTemplate = CRest::call(
       'crm.documentgenerator.template.add',
       [
           'fields' => [
               'name' => $sDocName,
               'numeratorId' => $resNum['result']['numerator']['id'],  
               'region' => 'ru', 
               'users' => [
                   'UA'//User All
               ],
               'entityTypeId' => ['2'], 
               'file' => base64_encode(file_get_contents($filePath))
           ]
       ]
   );
   ```

{% endlist %}

Метод [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) вернет объект `resTemplate` с информацией о шаблоне.

```json
template: { 
    "id": "39", 
    "name": "Демонстрационная реализация товара", 
    "region": "ru",
    "​​active": "Y",
    "​​code": null,
    "​​createTime": "2025-07-09T16:12:13+03:00",
    "​​download": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=39",
    "​​downloadMachine": "https://some-domain.bitrix24.ru/rest/crm.documentgenerator.template.download.json?sessid=c4ad892d7583ead4fd38666a0af85cb7&token=crm%7CYWN0aW9uPWNybS5kb2N1bWVudGdlbmVyYXRvci50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTM5Jl89azNRNlFuVVRvUGl5VzNLaExTVDJCR3g1WjdyQ0tSSFA%3D%7CImNybS5kb2N1bWVudGdlbmVyYXRvci50ZW1wbGF0ZS5kb3dubG9hZHxjcm18WVdOMGFXOXVQV055YlM1a2IyTjFiV1Z1ZEdkbGJtVnlZWFJ2Y2k1MFpXMXdiR0YwWlM1a2IzZHViRzloWkNaVFNWUkZYMGxFUFhNeEptbGtQVE01Smw4OWF6TlJObEZ1VlZSdlVHbDVWek5MYUV4VFZESkNSM2cxV2pkeVEwdFNTRkE9fGM0YWQ4OTJkNzU4M2VhZDRmZDM4NjY2YTBhZjg1Y2I3Ig%3D%3D.GMgjAbCT099xlo8CJN9n5mP2s7MBbqfU%2BbEM%2FAzpoYE%3D",
    "​​entityTypeId": [ "0": "2" ],
    "​​​length": 1,
    "​​​numeratorId": "43",
    "​​users": [ "0": "UA" ],
    "sort": 500
}
​​
```

## 3\. Сгенерируем документ

Если шаблон успешно загружен, создадим документ для сделки с помощью метода [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md). В методе укажем три параметра.

1. `templateId` — идентификатор шаблона. Передадим его из объекта `resTemplate`, который получен на втором шаге.

2. `entityTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `2` — сделка. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

3. `entityId` — идентификатор сделки. Укажем переменную `iDealID`.

{% list tabs %}

-  JS

   ```js
   BX24.callMethod(
       'crm.documentgenerator.document.add',
       {
           'templateId': resTemplate.data().template.id,
           'entityTypeId': '2',
           'entityId': iDealID
       },
       function(resDoc) {
           if (resDoc.error()) {
               console.error(resDoc.error());
               alert('Документ не создан: ' + resDoc.error_description());
           } else {
               alert('Документ создан');
           }
       }
   );
   ```

-  PHP

   ```php
   $resDoc = CRest::call(
       'crm.documentgenerator.document.add',
       [
           'templateId' => $resTemplate['result']['template']['id'],
           'entityTypeId' => '2', 
           'entityId' => $iDealID,
       ]
   );
   ```

{% endlist %}

Документ будет сформирован и метод [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) вернет его параметры.

```json
"document":{
    "products":{
        "currencyId":"RUB",
        "totalSum":1500,
        "totalRows":1
    },
    "downloadUrl":"https:\\/\\/some-domain.bitrix24.ru\\/bitrix\\/services\\/main\\/ajax.php?action=crm.documentgenerator.document.download\\u0026SITE_ID=s1\\u0026id=29",
    "publicUrl":null,
    "title":"Демонстрационная реализация товара 1",
    "number":"1",
    "id":29,
    "createTime":"2025-07-09T16:29:27+03:00",
    "createdBy":27,
    "updateTime":"2025-07-09T16:29:27+03:00",
    "templateId":"39",
    "emailDiskFile":4917,
    "entityId":"1",
    "entityTypeId":"2",
    "downloadUrlMachine":"https:\\/\\/some-domain.bitrix24.ru\\/rest\\/crm.documentgenerator.document.download.json?sessid=c4ad892d7583ead4fd38666a0af85cb7\\u0026token=crm%7CYWN0aW9uPWNybS5kb2N1bWVudGdlbmVyYXRvci5kb2N1bWVudC5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTI5Jl89YlQ2SU9XeGVnR2s3NnZ5M0hGVlRxTDVaRlJtdFgyNTE%3D%7CImNybS5kb2N1bWVudGdlbmVyYXRvci5kb2N1bWVudC5kb3dubG9hZHxjcm18WVdOMGFXOXVQV055YlM1a2IyTjFiV1Z1ZEdkbGJtVnlZWFJ2Y2k1a2IyTjFiV1Z1ZEM1a2IzZHViRzloWkNaVFNWUkZYMGxFUFhNeEptbGtQVEk1Smw4OVlsUTJTVTlYZUdWblIyczNOblo1TTBoR1ZsUnhURFZhUmxKdGRGZ3lOVEU9fGM0YWQ4OTJkNzU4M2VhZDRmZDM4NjY2YTBhZjg1Y2I3Ig%3D%3D.H575mM4Mf%2Fj4PVH2Ngzb1kmkQhdScsAL75ZJkbYkALk%3D"
}
```

## Пример кода

{% list tabs %}

-  JS

   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       let filePath = 'template.docx'; // путь к локальному файлу шаблона
       let iDealID = 1; // идентификатор сделки
       let sDocName = 'Демонстрационная реализация товара';
   
       function fileToBase64(filePath) {
           return new Promise((resolve, reject) => {
               fetch(filePath)
                   .then(response => response.blob())
                   .then(blob => {
                       let reader = new FileReader();
                       reader.onload end = () => resolve(reader.result.split(',')[1]);
                       reader.oner ror = reject;
                       reader.readAsDataURL(blob);
                   });
           });
       }
   
       async function createDocument() {
           try {
               let fileContent = await fileToBase64(filePath);
   
               BX24.callMethod(
                   'crm.documentgenerator.numerator.add',
                   {
                       'fields': {
                           'name': 'Нумератор из REST',
                           'template': '{NUMBER}'
                       }
                   },
                   function(resNum) {
                       if (resNum.error()) {
                           console.error(resNum.error());
                           alert('Нумератор не добавлен: ' + resNum.error_description());
                           return;
                       }
   
                       if (resNum.data().numerator.id) {
                           BX24.callMethod(
                               'crm.documentgenerator.template.add',
                               {
                                   'fields': {
                                       'name': sDocName,
                                       'numeratorId': resNum.data().numerator.id,
                                       'region': 'ru',
                                       'users': ['UA'],
                                       'entityTypeId': ['2'],
                                       'file': fileContent
                                   }
                               },
                               function(resTemplate) {
                                   if (resTemplate.error()) {
                                       console.error(resTemplate.error());
                                       alert('Шаблон не добавлен: ' + resTemplate.error_description());
                                       return;
                                   }
   
                                   if (resTemplate.data().template.id) {
                                       BX24.callMethod(
                                           'crm.documentgenerator.document.add',
                                           {
                                               'templateId': resTemplate.data().template.id,
                                               'entityTypeId': '2',
                                               'entityId': iDealID
                                           },
                                           function(resDoc) {
                                               if (resDoc.error()) {
                                                   console.error(resDoc.error());
                                                   alert('Документ не создан: ' + resDoc.error_description());
                                               } else {
                                                   alert('Документ создан');
                                               }
                                           }
                                       );
                                   }
                               }
                           );
                       }
                   }
               );
           } catch (error) {
               console.error(error);
               alert('Ошибка: ' + error.message);
           }
       }
   
       createDocument();
   });
   ```

-  PHP

   ```php
   $filePath = __DIR__ . '/template.docx'; // путь к локальному файлу шаблона
   $iDealID = 1; // идентификатор сделки
   $sDocName = 'Демонстрационная реализация товара';
   $resNum = CRest::call(
       'crm.documentgenerator.numerator.add',
       [
           'fields' => [
               'name' => 'Нумератор из REST',
               'template' => '{NUMBER}',
           ]
       ]
   );
   if (!empty($resNum['result']['numerator']['id']))
   {
       $resTemplate = CRest::call(
           'crm.documentgenerator.template.add',
           [
               'fields' => [
                   'name' => $sDocName,
                   'numeratorId' => $resNum['result']['numerator']['id'], // crm.documentgenerator.numerator.add
                   'region' => 'ru', // eu,de,ua,by,ru
                   'users' => [
                       'UA'//User All
                   ],
                   'entityTypeId' => ['2'], //2 — сделка в CRest::call('crm.enum.ownertype');
                   'file' => base64_encode(file_get_contents($filePath))
               ]
           ]
       );
       if (!empty($resTemplate['result']['template']['id']))
       {
           $resDoc = CRest::call(
               'crm.documentgenerator.document.add',
               [
                   'templateId' => $resTemplate['result']['template']['id'],
                   'entityTypeId' => '2', //2 — сделка в CRest::call('crm.enum.ownertype');
                   'entityId' => $iDealID,
               ]
           );
       }
   }
   if (!empty($resDoc['result']))
   {
       echo json_encode(['message' => 'Документ создан']);
   }
   elseif (!empty($resDoc['error_description']))
   {
       echo json_encode(['message' => 'Документ не создан: ' . $resDoc['error_description']]);
   }
   else
   {
       echo json_encode(['message' => 'Документ не создан']);
   }
   ```

{% endlist %}