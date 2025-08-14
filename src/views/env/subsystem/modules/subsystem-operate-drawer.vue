<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateSubsystem, fetchUpdateSubsystem } from '@/service/api/env/subsystem';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'SubsystemOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Subsystem | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: sysNormalDisableOptions } = useDict('sys_normal_disable');

const { formRef, validate, restoreValidation } = useNaiveForm();
const { createRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增物理子系统',
    edit: '编辑物理子系统'
  };
  return titles[props.operateType];
});

type Model = Api.Env.SubsystemOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    code: '',
    status: ''
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'code' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: createRequiredRule('中文名称不能为空'),
  code: createRequiredRule('英文简称不能为空'),
  status: createRequiredRule('状态不能为空')
};

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const { id, name, code, status } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateSubsystem({ name, code, status });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateSubsystem({ id, name, code, status });
    if (error) return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="中文名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入中文名称" />
        </NFormItem>
        <NFormItem label="英文简称" path="code">
          <NInput v-model:value="model.code" placeholder="请输入英文简称" />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NRadioGroup v-model:value="model.status">
            <NSpace>
              <NRadio
                v-for="option in sysNormalDisableOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </NSpace>
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
