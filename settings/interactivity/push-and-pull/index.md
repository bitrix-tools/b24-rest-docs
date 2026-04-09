# Push&Pull: обзор методов

Методы Push&Pull помогают приложению передавать и получать данные в реальном времени. С их помощью приложение получает параметры подключения, отправляет событие в канал и push-уведомление пользователю приложения.

Группа методов `pull.application.*` помогает обновлять интерфейс без перезагрузки страницы и отправлять уведомления на мобильные устройства.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Интерактивность в приложениях](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=266&LESSON_ID=25560)

{% note info "" %}

Методы раздела работают только в контексте [приложения](../../app-installation/index.md).

{% endnote %}

## Как выбрать сценарий

Методы этого раздела используют в двух сценариях:

**Обновить интерфейс открытого приложения.** Если приложение уже открыто в браузере Битрикс24 и должно получать события без перезагрузки страницы, смотрите статью [Push&Pull в браузере](../push-and-pull-in-browser.md).

**Подключить собственный клиент к серверам Push&Pull.** Если вы создаете собственный клиент и хотите работать с серверами Push&Pull напрямую, смотрите статью [Собственный Push&Pull клиент](../custom-push-and-pull-client.md).

## Как начать работу

1. Получите параметры подключения приложения методом [pull.application.config.get](./pull-application-config-get.md)
2. Подключите приложение к Push&Pull по данным сервера и каналов из ответа [pull.application.config.get](./pull-application-config-get.md)
3. Если нужно обновить интерфейс открытого приложения, отправьте событие в канал методом [pull.application.event.add](./pull-application-event-add.md)
4. Если нужно уведомить пользователя на мобильном устройстве, используйте метод [pull.application.push.add](./pull-application-push-add.md)

## Связь с другими объектами

**Пользователь.** В методе [pull.application.event.add](./pull-application-event-add.md) параметр `USER_ID` задает пользователя или список пользователей, в чьи каналы отправляется событие. В методе [pull.application.push.add](./pull-application-push-add.md) параметр `USER_ID` задает пользователя или список пользователей, которые получат push-уведомление. Получить идентификатор пользователя можно методами [user.get](../../../api-reference/user/user-get.md) и [user.current](../../../api-reference/user/user-current.md).

## Обзор методов {#all-methods}

> Scope: [`pull`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [pull.application.config.get](./pull-application-config-get.md) | Возвращает конфигурацию подключения к серверам Push&Pull для текущего приложения ||
|| [pull.application.event.add](./pull-application-event-add.md) | Отправляет событие в канал приложения ||
|| [pull.application.push.add](./pull-application-push-add.md) | Отправляет push-уведомление на мобильное устройство в рамках приложения ||
|#
