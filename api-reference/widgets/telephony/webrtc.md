# WebRTC

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Битрикс24 позволяет встраивать внешний WebRTC-клиент в веб-версию продукта. Собственного кода встраивания у этого сценария нет: клиент загружается в точку `PAGE_BACKGROUND_WORKER`, а телефония подключается методами раздела [{#T}](../../telephony/index.md).

Видимого элемента в интерфейсе у сценария тоже нет. Пользователь работает со стандартной карточкой звонка, а WebRTC-клиент приложения выполняется в фоне.

Чтобы встроить свой WebRTC-клиент:

1. Загрузите свой WebRTC-клиент в [специальную точку встраивания](../universal/background-worker.md) `PAGE_BACKGROUND_WORKER`.
2. При поступлении входящего звонка регистрируйте его обычным методом интеграции телефонии [{#T}](../../telephony/telephony-external-call-register.md), который также покажет пользователю стандартную карточку звонка.
3. Управляйте состоянием и кнопками карточки звонка с помощью [специальных js-методов](../ui-interaction/page-background-worker/index.md), доступных для обработчика виджета `PAGE_BACKGROUND_WORKER`.
4. По завершении звонка сообщайте об этом в Битрикс24 с помощью метода [{#T}](../../telephony/telephony-external-call-finish.md).

При регистрации обработчика `PAGE_BACKGROUND_WORKER` обязателен параметр `OPTIONS[errorHandlerUrl]`: если обработчик больше десяти раз за сутки грузился дольше пяти секунд, Битрикс24 удаляет регистрацию и сообщает об этом запросом на указанный адрес.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "PLACEMENT": "PAGE_BACKGROUND_WORKER",
    "HANDLER": "https://your-domain.com/widgets/webrtc-worker.php",
    "TITLE": "WebRTC-клиент",
    "OPTIONS": {
      "errorHandlerUrl": "https://your-domain.com/widgets/webrtc-error.php"
    },
    "auth": "**put_access_token_here**"
  }' \
  https://**put_your_bitrix24_address**/rest/placement.bind
```

Порядок работы с карточкой звонка описан в статье [{#T}](../ui-interaction/page-background-worker/webrtc-scenario.md), а полный состав данных обработчика — на странице точки [{#T}](../universal/background-worker.md).

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| `placement.bind` возвращает `EMPTY_ERROR_HANDLER_URL` | Точка `PAGE_BACKGROUND_WORKER` требует адрес для сообщений об отключении. Передайте `OPTIONS[errorHandlerUrl]` ||
|| `placement.bind` возвращает `ERROR_PLACEMENT_MAX_COUNT` | Обработчик для этой точки уже зарегистрирован: она регистрируется в единственном экземпляре. Снимите старую регистрацию методом [placement.unbind](../placement-unbind.md) ||
|| `placement.bind` возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| Фоновый обработчик перестал вызываться | Регистрация снята из-за медленных ответов. Битрикс24 сообщает об этом на адрес из `OPTIONS[errorHandlerUrl]`, после исправления зарегистрируйте обработчик заново ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

Остальное — например, загрузку записей разговоров в Битрикс24 — реализуют [методами интеграции телефонии](../../telephony/index.md), уже без обращения к WebRTC-клиенту.

Если приложению нужна собственная вкладка в карточке звонка, используйте точку встраивания [{#T}](./call-card.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./call-card.md)
- [{#T}](../universal/background-worker.md)
- [{#T}](../ui-interaction/page-background-worker/index.md)
- [{#T}](../ui-interaction/page-background-worker/webrtc-scenario.md)
- [{#T}](../placement-bind.md)
- [{#T}](../../telephony/index.md)
