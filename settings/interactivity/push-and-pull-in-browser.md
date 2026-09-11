# Push&Pull в браузере

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Штатный клиент `BX.PullClient` держит соединение с серверами реального времени и передает в браузер события, которые серверная часть приложения отправляет методом [pull.application.event.add](./push-and-pull/pull-application-event-add.md). Интерфейс приложения обновляется сразу, без опроса сервера и перезагрузки страницы.

Клиент подключают к готовой странице приложения. Если приложение работает отдельно от интерфейса Битрикс24 и штатного клиента недостаточно, соединение придется поддерживать самостоятельно — это описывает статья [{#T}](./custom-push-and-pull-client.md).

{% note info "" %}

Клиент работает только в контексте [приложения](../app-installation/index.md): конфигурацию подключения он запрашивает методом [pull.application.config.get](./push-and-pull/pull-application-config-get.md), которому нужен OAuth-токен и скоуп `pull`. Вебхук такой контекст не создает.

{% endnote %}

## Что нужно перед началом

- установленное [приложение](../app-installation/index.md) с интерфейсом
- скоуп [`pull`](../../api-reference/scopes/permissions.md)

Для клиента нужны две библиотеки с `api.bitrix24.tech`: `api/v1/` дает объект `BX24` для вызовов REST, `api/v1/pull/` — конструктор `BX.PullClient`.

## Как подключить клиент

1. Подключите библиотеки `api/v1/` и `api/v1/pull/` в `<head>` страницы
2. Дождитесь готовности `BX24`: остальные шаги выполняйте внутри `BX24.init`
3. Получите идентификатор пользователя методом [user.current](../../api-reference/user/user-current.md)
4. Создайте клиент через `new BX.PullClient()` и передайте [параметры](#params)
5. Подпишитесь на события методом `subscribe`
6. Запустите соединение методом `start`

```html
<!DOCTYPE html>
<html>
<head>
	<title>Bitrix24 application with Push & Pull</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script src="//api.bitrix24.tech/api/v1/"></script>
	<script src="//api.bitrix24.tech/api/v1/pull/"></script>
</head>
<body>
	<script>
		BX24.init(function () {
			BX24.callMethod('user.current', {}, function (result) {
				if (result.error()) {
					console.error(result.error().ex);
					return;
				}

				window.appPullClient = new BX.PullClient({
					restApplication: 'my_app_pull',
					restClient: BX24,
					userId: Number(result.data().ID)
				});

				window.appPullClient.subscribe({
					moduleId: 'application',
					callback: function (data) {
						console.warn(data); // {command: '...', params: {...}, extra: {...}}
					}
				});

				window.appPullClient.start();
			});
		});
	</script>
</body>
</html>
```

Чтобы убедиться, что клиент получает события, отправьте событие из серверной части методом [pull.application.event.add](./push-and-pull/pull-application-event-add.md). Обработчик выведет в консоль браузера объект с полями `command`, `params` и `extra`.

## Параметры BX.PullClient {#params}

#|
|| **Параметр** | **Описание** ||
|| `restApplication` | Строковый идентификатор приложения. Когда он задан, клиент запрашивает конфигурацию методом [pull.application.config.get](./push-and-pull/pull-application-config-get.md) и подключается к каналам приложения. По этому же значению клиент хранит состояние соединения в браузере, поэтому задайте стабильную строку — одну на приложение ||
|| `restClient` | Объект, через который клиент вызывает методы REST. В приложении передайте `BX24` из подключенной библиотеки. Без этого параметра клиент создаст собственный объект, а тот авторизуется идентификатором сессии Битрикс24, которого на странице приложения нет ||
|| `userId` | Идентификатор текущего пользователя. На странице приложения клиенту неоткуда взять его самостоятельно, поэтому значение передают явно — в примере его возвращает [user.current](../../api-reference/user/user-current.md) ||
|#

## Подписка на события {#subscribe}

Метод `subscribe` регистрирует обработчик и возвращает функцию, которая его отключает.

#|
|| **Поле** | **Описание** ||
|| `moduleId` | Модуль, события которого нужны приложению. События из канала приложения приходят с `application` — это значение параметра `MODULE_ID` метода [pull.application.event.add](./push-and-pull/pull-application-event-add.md) ||
|| `callback` | Функция-обработчик. Что она получит, зависит от того, задано ли поле `command` ||
|| `command` | Необязательное поле. Команда, на которую подписан обработчик, — значение параметра `COMMAND` метода [pull.application.event.add](./push-and-pull/pull-application-event-add.md). Без него обработчик получает все команды модуля ||
|| `type` | Необязательное поле. Источник событий, по умолчанию `server` — события, которые отправила серверная часть. Для событий приложения менять не нужно ||
|#

От поля `command` зависит, в каком виде обработчик получит данные:

- **без `command`** — событие приходит целиком: `callback(data, info)`, где `data` содержит `command`, `params` и `extra`
- **с `command`** — те же данные приходят разобранными: `callback(params, extra, command, info)`

Последним значением обработчик в обеих формах получает `info` с полями `type` и `moduleId`.

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./custom-push-and-pull-client.md)
- [{#T}](./push-and-pull/pull-application-config-get.md)
- [{#T}](./push-and-pull/pull-application-event-add.md)
