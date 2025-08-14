<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateDeployUnit, fetchUpdateDeployUnit } from '@/service/api/env/deploy-unit';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'DeployUnitOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.DeployUnit | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: envDeployUnitTypeOptions } = useDict('env_deploy_unit_type');
const { options: envDeployUnitRunTypeOptions } = useDict('env_deploy_unit_run_type');
const { options: envDeployUnitAppTypeOptions } = useDict('env_deploy_unit_app_type');
const { options: envDeployUnitProcessPurposeOptions } = useDict('env_deploy_unit_process_purpose');
const { options: sysNormalDisableOptions } = useDict('sys_normal_disable');
const { options: sysYesNoOptions } = useDict('sys_yes_no');
const { options: envBizTypeOptions } = useDict('env_biz_type');

const { formRef, validate, restoreValidation } = useNaiveForm();
const { createRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增部署单元',
    edit: '编辑部署单元'
  };
  return titles[props.operateType];
});

type Model = Api.Env.DeployUnitOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    subsystemCode: '',
    bizType: '',
    unitCode: '',
    chnName: '',
    type: '',
    version: '',
    appType: '',
    deployUser: '',
    deployPath: '',
    processName: '',
    processPurpose: '',
    runType: '',
    isAutoWhenBoot: '',
    logPath: '',
    txLogPath: '',
    startCmd: '',
    stopCmd: '',
    contact: '',
    developer: '',
    baseSoft: '',
    baseSoftVersion: '',
    status: ''
  };
}

type RuleKey = Extract<
  keyof Model,
  | 'subsystemCode'
  | 'bizType'
  | 'unitCode'
  | 'chnName'
  | 'type'
  | 'version'
  | 'appType'
  | 'processName'
  | 'processPurpose'
  | 'runType'
  | 'isAutoWhenBoot'
  | 'logPath'
  | 'txLogPath'
  | 'startCmd'
  | 'stopCmd'
  | 'contact'
  | 'developer'
  | 'baseSoft'
  | 'baseSoftVersion'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  subsystemCode: createRequiredRule('物理子系统代码不能为空'),
  bizType: createRequiredRule('业务类型不能为空'),
  unitCode: createRequiredRule('部署单元编码不能为空'),
  chnName: createRequiredRule('中文名称不能为空'),
  type: createRequiredRule('类型不能为空'),
  version: createRequiredRule('版本不能为空'),
  appType: createRequiredRule('应用类型不能为空'),
  processName: createRequiredRule('进程名称不能为空'),
  processPurpose: createRequiredRule('进程用途不能为空'),
  runType: createRequiredRule('使用方式不能为空'),
  isAutoWhenBoot: createRequiredRule('是否开机启动不能为空'),
  logPath: createRequiredRule('日志目录不能为空'),
  txLogPath: createRequiredRule('交易监控日志目录不能为空'),
  startCmd: createRequiredRule('启动命令不能为空'),
  stopCmd: createRequiredRule('停止命令不能为空'),
  contact: createRequiredRule('联系人不能为空'),
  developer: createRequiredRule('开发人不能为空'),
  baseSoft: createRequiredRule('基础软件或中间件不能为空'),
  baseSoftVersion: createRequiredRule('基础软件或中间件的版本不能为空')
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

  const {
    id,
    subsystemCode,
    bizType,
    unitCode,
    chnName,
    type,
    version,
    appType,
    deployUser,
    deployPath,
    processName,
    processPurpose,
    runType,
    isAutoWhenBoot,
    logPath,
    txLogPath,
    startCmd,
    stopCmd,
    contact,
    developer,
    baseSoft,
    baseSoftVersion,
    status
  } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateDeployUnit({
      subsystemCode,
      bizType,
      unitCode,
      chnName,
      type,
      version,
      appType,
      deployUser,
      deployPath,
      processName,
      processPurpose,
      runType,
      isAutoWhenBoot,
      logPath,
      txLogPath,
      startCmd,
      stopCmd,
      contact,
      developer,
      baseSoft,
      baseSoftVersion,
      status
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateDeployUnit({
      id,
      subsystemCode,
      bizType,
      unitCode,
      chnName,
      type,
      version,
      appType,
      deployUser,
      deployPath,
      processName,
      processPurpose,
      runType,
      isAutoWhenBoot,
      logPath,
      txLogPath,
      startCmd,
      stopCmd,
      contact,
      developer,
      baseSoft,
      baseSoftVersion,
      status
    });
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
        <NFormItem label="物理子系统代码" path="subsystemCode">
          <NInput v-model:value="model.subsystemCode" placeholder="请输入物理子系统代码" />
        </NFormItem>
        <NFormItem label="业务类型" path="bizType">
          <NSelect v-model:value="model.bizType" placeholder="请选择业务类型" :options="envBizTypeOptions" clearable />
        </NFormItem>
        <NFormItem label="部署单元编码" path="unitCode">
          <NInput v-model:value="model.unitCode" placeholder="请输入部署单元编码" />
        </NFormItem>
        <NFormItem label="中文名称" path="chnName">
          <NInput v-model:value="model.chnName" placeholder="请输入中文名称" />
        </NFormItem>
        <NFormItem label="类型" path="type">
          <NSelect v-model:value="model.type" placeholder="请选择类型" :options="envDeployUnitTypeOptions" clearable />
        </NFormItem>
        <NFormItem label="版本" path="version">
          <NInput v-model:value="model.version" placeholder="请输入版本" />
        </NFormItem>
        <NFormItem label="应用类型" path="appType">
          <NSelect
            v-model:value="model.appType"
            placeholder="请选择应用类型"
            :options="envDeployUnitAppTypeOptions"
            clearable
          />
        </NFormItem>
        <NFormItem label="部署用户" path="deployUser">
          <NInput v-model:value="model.deployUser" placeholder="请输入部署用户" />
        </NFormItem>
        <NFormItem label="部署目录" path="deployPath">
          <NInput v-model:value="model.deployPath" placeholder="请输入部署目录" />
        </NFormItem>
        <NFormItem label="进程名称" path="processName">
          <NInput v-model:value="model.processName" placeholder="请输入进程名称" />
        </NFormItem>
        <NFormItem label="进程用途" path="processPurpose">
          <NSelect
            v-model:value="model.processPurpose"
            placeholder="请选择进程用途"
            :options="envDeployUnitProcessPurposeOptions"
            clearable
          />
        </NFormItem>
        <NFormItem label="使用方式" path="runType">
          <NSelect
            v-model:value="model.runType"
            placeholder="请选择使用方式"
            :options="envDeployUnitRunTypeOptions"
            clearable
          />
        </NFormItem>
        <NFormItem label="是否开机启动" path="isAutoWhenBoot">
          <NSelect
            v-model:value="model.isAutoWhenBoot"
            placeholder="请选择是否开机启动"
            :options="sysYesNoOptions"
            clearable
          />
        </NFormItem>
        <NFormItem label="日志目录" path="logPath">
          <NInput v-model:value="model.logPath" placeholder="请输入日志目录" />
        </NFormItem>
        <NFormItem label="交易监控日志目录" path="txLogPath">
          <NInput v-model:value="model.txLogPath" placeholder="请输入交易监控日志目录" />
        </NFormItem>
        <NFormItem label="启动命令" path="startCmd">
          <NInput v-model:value="model.startCmd" placeholder="请输入启动命令" />
        </NFormItem>
        <NFormItem label="停止命令" path="stopCmd">
          <NInput v-model:value="model.stopCmd" placeholder="请输入停止命令" />
        </NFormItem>
        <NFormItem label="联系人" path="contact">
          <NInput v-model:value="model.contact" placeholder="请输入联系人" />
        </NFormItem>
        <NFormItem label="开发人" path="developer">
          <NInput v-model:value="model.developer" placeholder="请输入开发人" />
        </NFormItem>
        <NFormItem label="基础软件或中间件" path="baseSoft">
          <NInput v-model:value="model.baseSoft" placeholder="请输入基础软件或中间件" />
        </NFormItem>
        <NFormItem label="基础软件或中间件的版本" path="baseSoftVersion">
          <NInput v-model:value="model.baseSoftVersion" placeholder="请输入基础软件或中间件的版本" />
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
