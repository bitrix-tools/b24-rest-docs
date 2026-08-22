{% note alert "Messenger.* доступен только коду на домене Битрикс24" %}

Граница проходит по origin, а не по «устаревшему и актуальному API».

**Код на домене Битрикс24** — сам Битрикс24 и ваш код, размещенный на том же домене. Рантайм мессенджера доступен напрямую: `import { Messenger } from 'im.public'` или `BX.Runtime.loadExtension('im.public.iframe')`.

**Приложение во фрейме** — другой origin, рантайма Битрикс24 в нем нет. `Messenger.*` и `BX.Runtime.loadExtension` во фрейме недоступны, и заменить ими методы `BX24.*` нельзя. Единственный канал наружу — postMessage-мост:

- методы `BX24.*` библиотеки [BX24 JS SDK](/sdk/bx24-js-sdk/index.html)
- метод `$b24.parent.message.send` библиотеки [@bitrix24/b24jssdk](/sdk/b24jssdk/index.html)

```js
// приложение во фрейме: обращение к мессенджеру через мост
const $b24 = await B24Js.initializeB24Frame()

const response = await $b24.parent.message.send(
    'im:getImTextareaContent',
    {
        requestId: B24Js.Text.getUuidRfc4122(),
        isSafely: true,
        safelyTime: 1500
    }
)
```

{% endnote %}
