name := """yuto"""
organization := "com.example"
version := "1.0-SNAPSHOT"
scalaVersion := "2.13.1"

resolvers += "Sonatype OSS Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

libraryDependencies ++= Seq(
  javaJdbc,
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41"
)

libraryDependencies += guice
EclipseKeys.preTasks := Seq(compile in Compile)
EclipseKeys.projectFlavor := EclipseProjectFlavor.Java
EclipseKeys.createSrc := EclipseCreateSrc.ValueSet(EclipseCreateSrc.ManagedClasses, EclipseCreateSrc.ManagedResources)

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)
