# Кастомные коннекторы открытых линий

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: как это работает, в каких случаях пригодится, пользовательский сценарий подключения через интерфейс

{% endnote %}

{% endif %}

Описание REST-методов и событий, работающих с коннекторами для внешних мессенджеров. Разрешение **imopenlines**.

{% note info "Примечание" %}

Методы REST скоупа **imconnector** в текущей версии не поддерживают работу через вебхуки.

{% endnote %}

REST-методы, доступные при работе с коннекторами для внешних мессенджеров.

#|
|| **Метод** | **Описание** ||
|| [imconnector.register](imconnector-register.md) | Регистрация коннектора. ||
|| [imconnector.activate](imconnector-activate.md) | Активировать коннектор. ||
|| [imconnector.deactivate](imconnector-deactivate.md) | Деактивировать коннектор. ||
|| [imconnector.status](imconnector-status.md) | Получить статус коннектора. ||
|| [imconnector.connector.data.set](./imconnector-connector-data-set.md) | Изменить настройки коннектора ||
|| [imconnector.list](imconnector-list.md) | Получение списка коннекторов. ||
|| [imconnector.unregister](imconnector-unregister.md) | Отмена регистрации коннектора. ||
|| [imconnector.send.messages](imconnector-send-messages.md) | Отправить сообщения в Битрикс24. ||
|| [imconnector.update.messages](imconnector-update-messages.md) | Изменить отправленные сообщения. ||
|| [imconnector.delete.messages](imconnector-delete-messages.md) | Удалить отправленные сообщения. ||
|| [imconnector.send.status.delivery](imconnector-send-status-delivery.md) | Обновить статус “доставлено”. ||
|| [imconnector.send.status.reading](imconnector-send-status-reading.md) | Обновить статус “прочитано”. ||
|#

