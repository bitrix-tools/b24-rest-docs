# Прикрепить запись к завершенному звонку и к Делу звонка telephony.externalCall.attachRecord

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](./_includes/scope-telephony-all.md) %}

Метод `telephony.externalCall.attachRecord` прикрепляет запись к завершенному звонку и к Делу звонка. Должен вызываться после [telephony.externalcall.finish](./telephony-external-call-finish.md), если запись на момент вызова finish еще не готова. 

Запись прикрепляется только одна. 

Если вызвать метод несколько раз, то следующий вызов перетрет предыдущую запись.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **CALL_ID**^*^ 
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalcall.register](./telephony-external-call-register.md). ||
|| **FILENAME** 
[`string`](../data-types.md) | Имя файла, обязательный. Имя файла должно заканчиваться на wav или mp3. ||
|| **FILE_CONTENT** 
[`string`](../data-types.md) | [base64-кодированное](../files/how-to-upload-files.md) содержимое файла. Необязательный. Если параметр не указать, метод вернет параметр `uploadUrl` - урл, на который можно за'upload'ить содержимое файла. ||
|| **RECORD_URL** 
[`string`](../data-types.md) | Ссылка на запись на сервере клиента. Если указано, то будет осуществлена попытка скачать запись по указанному адресу, вместо ожидания загрузки записи на портал клиента.
Во время выполнения метода, портал осуществит одну попытку скачать запись по указанному адресу. В случае неудачи, метод вернет ошибку.

Так как возможность скачивания зависит от множества независящих от портала факторов, использование данного параметра не рекомендуется. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}
